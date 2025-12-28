import {randomBytes} from 'node:crypto';
import Fuse from 'fuse.js'
import inflection from 'inflection';
import sortOn from 'sort-on'
import chalk from 'chalk'

// Flatten a nested object into a searchable string
function flattenObject(obj, prefix = '') {
    const result = {}
    for (const key in obj) {
        const value = obj[key]
        const newKey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'object' && value !== null) {
            Object.assign(result, flattenObject(value, newKey))
        } else {
            result[newKey] = String(value ?? '')
        }
    }
    return result
}

// Safe deep property getter
function getValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

// Apply field filtering (_gte, _lte, _ne, _like, exact match)
function applyFilters(items, query) {
    return items.filter(item => {
        return Object.entries(query).every(([key, val]) => {
            if (key.startsWith('_')) return true // skip reserved keys

            // Handle operators
            if (key.endsWith('_lt')) {
                const field = key.replace('_lt', '')
                return getValue(item, field) < val
            }
            if (key.endsWith('_gt')) {
                const field = key.replace('_gt', '')
                return getValue(item, field) > val
            }
            if (key.endsWith('_gte')) {
                const field = key.replace('_gte', '')
                return getValue(item, field) >= val
            }
            if (key.endsWith('_lte')) {
                const field = key.replace('_lte', '')
                return getValue(item, field) <= val
            }
            if (key.endsWith('_ne')) {
                const field = key.replace('_ne', '')
                return getValue(item, field) !== val
            }
            if (key.endsWith('_like')) {
                const field = key.replace('_like', '')
                const v = getValue(item, field)
                return new RegExp(String(val), 'i').test(String(v ?? ''))
            }

            // Default: exact match
            const v = String(getValue(item, key));
            const valList = String(val).split(',');

            if (valList.length > 1) {
                return valList.some(singleVal => v.includes(singleVal));
            }
            return v === String(val)
        })
    })
}

function ensureArray(arg = []) {
    return Array.isArray(arg) ? arg : [arg];
}

function embed(db, name, item, related) {
    if (inflection.singularize(related) === related) {
        const relatedData = db.data[inflection.pluralize(related)];
        if (!relatedData) {
            return item;
        }
        const foreignKey = `${related}Id`;
        const relatedItem = relatedData.find((relatedItem) => {
            return relatedItem['id'] === item[foreignKey];
        });
        return {...item, [related]: relatedItem};
    }
    const relatedData = db.data[related];
    if (!relatedData) {
        return item;
    }
    const foreignKey = `${inflection.singularize(name)}Id`;
    const relatedItems = relatedData.filter((relatedItem) => relatedItem[foreignKey] === item['id']);
    return {...item, [related]: relatedItems};
}

// Fuzzy search + filters + pagination + sorting + slicing + embed middleware
export function filtersMiddleware(router) {
    return (req, res, next) => {
        const {name} = req.params || {}
        if (!name) return next()
        const db = router.db
        let items = db.get(name)?.value()
        if (!Array.isArray(items)) return next()

        const {_q, _fuzzy, _page, _per_page, _sort, _start, _end, _embed} = req.query

        // Include
        ensureArray(_embed).forEach((related) => {
            if (items !== undefined && Array.isArray(items)) {
                items = items.map((item) => embed(db, name, item, related));
            }
        });

        // 1️⃣ Field filters
        items = applyFilters(items, req.query)

        // 2️⃣ Full-text / fuzzy search
        if (_q) {
            const searchable = items.map(item => ({
                original: item,
                __flat: Object.values(flattenObject(item)).join(' ')
            }))

            if (_fuzzy === 'true') {
                const fuse = new Fuse(searchable, {
                    keys: ['__flat'],
                    threshold: 0.3,
                    ignoreLocation: true,
                    minMatchCharLength: 2,
                    distance: 100
                })
                items = fuse.search(_q).map(r => r.item.original)
            } else {
                const qLower = _q.toLowerCase()
                items = searchable
                    .filter(i => i.__flat.toLowerCase().includes(qLower))
                    .map(i => i.original)
            }
        }

        // 3️⃣ Sorting (with -field for desc)
        if (_sort) {
            items = sortOn(items, _sort.split(','))
        }

        // 4️⃣ Slicing
        const startIndex = _start !== undefined ? parseInt(_start) : undefined
        const endIndex = _end !== undefined ? parseInt(_end) : undefined

        if (startIndex !== undefined || endIndex !== undefined) {
            items = items.slice(startIndex ?? 0, endIndex ?? items.length)
        }

        // 5️⃣ Pagination
        const perPage = parseInt(_per_page) || 10
        let page = parseInt(_page) || 1
        const totalItems = items.length
        const totalPages = Math.ceil(totalItems / perPage) || 1
        page = Math.max(1, Math.min(page, totalPages))
        const start = (page - 1) * perPage
        const end = start + perPage
        const paginated = items.slice(start, end)

        if ('_page' in req.query) {
            return res.json({
                first: 1,
                prev: page > 1 ? page - 1 : null,
                next: page < totalPages ? page + 1 : null,
                last: totalPages,
                pages: totalPages,
                items: totalItems,
                data: paginated,
            })
        }

        return res.json(items)
    }
}

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

export async function updateById(db, name, id, body = {}) {
    const items = db.get(name)?.value();
    if (!Array.isArray(items)) return null;

    const index = items.findIndex(i => i.id === id);
    if (index === -1) return null;

    const nextItem = { ...body, id };

    items.splice(index, 1, nextItem);

    await db.write();
    return nextItem;
}

export async function patchById(db, name, id, body = {}) {
    const items = db.get(name)?.value();
    if (!Array.isArray(items)) return null;

    const index = items.findIndex(i => i.id === id);
    if (index === -1) return null;

    const existing = items[index];

    const nextItem = deepMerge({ ...existing }, body);
    nextItem.id = id;

    items.splice(index, 1, nextItem);

    await db.write();
    return nextItem;
}

export async function deleteById(db, name, id) {
    const items = db.get(name)?.value();
    if (!Array.isArray(items)) return null;

    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const deletedItem = items[index];

    // remove the item
    items.splice(index, 1);

    // write changes
    await db.write();

    return deletedItem;
}

export async function bulkCreate(db, name, itemsToCreate = []) {
    const items = db.get(name)?.value();
    if (!Array.isArray(items)) return null;

    const createdItems = [];

    itemsToCreate.forEach(item => {
        if (!item.id) item.id = crypto.randomUUID();

        db.get(name).push(item).write();
        createdItems.push(item);
    });

    await db.write();
    return createdItems;
}

export async function bulkUpdate(db, name, ids = [], body = {}) {
    const items = db.get(name)?.value();
    if (items === undefined || !Array.isArray(items)) return;

    const updated = [];

    ids.forEach(id => {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const nextItem = { ...body, id };
        const index = items.indexOf(item);

        items.splice(index, 1, nextItem);
        updated.push(nextItem);
    });

    await db.write();
    return updated;
}

export async function bulkPatch(db, name, ids = [], body = {}) {
    const items = db.get(name)?.value();
    if (items === undefined || !Array.isArray(items)) return;

    const updated = [];

    ids.forEach(id => {
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        const existing = items[index];

        // deep patch
        const nextItem = deepMerge({ ...existing }, body);
        nextItem.id = id;

        // overwrite the item in db.json
        items[index] = nextItem;
        items.splice(index, 1, nextItem);
        updated.push(nextItem);
    });

    await db.write();
    return updated;
}

export async function bulkDelete(db, name, ids = []) {
    const items = db.get(name)?.value();
    if (!Array.isArray(items)) return [];

    const deleted = [];

    ids.forEach(id => {
        const item = db.get(name).find({ id }).value();
        if (item) {
            deleted.push(item);
            db.get(name).remove({ id }).write();
        }
    });

    return deleted;
}

// Generate short random hex ID
function randomId() {
    return randomBytes(2).toString('hex');
}

// Ensure all items in an array have a string id
function fixItemsIds(items) {
    items.forEach(item => {
        if (typeof item.id === 'number') {
            item.id = item.id.toString();
        }
        if (item.id === undefined) {
            item.id = randomId();
        }
    });
}

// Ensure all collections in db have ids
function fixAllItemsIds(dbData) {
    Object.values(dbData).forEach(value => {
        if (Array.isArray(value)) {
            fixItemsIds(value);
        }
    });
}

// 🚀 Middleware
export function idsMiddleware(router) {
    return (req, res, next) => {
        try {
            const db = router.db; // lowdb instance
            const data = db.getState(); // full db JSON
            fixAllItemsIds(data);
            // Persist changes back to db (so missing ids are saved)
            db.write();
        } catch (err) {
            console.error('[idsMiddleware] Error fixing ids:', err);
        }
        next();
    };
}

const kaomojis = ['♡⸜(˶˃ ᵕ ˂˶)⸝♡', '♡( ◡‿◡ )', '( ˶ˆ ᗜ ˆ˵ )', '(˶ᵔ ᵕ ᵔ˶)'];

function randomItem(items) {
    const index = Math.floor(Math.random() * items.length);
    return items.at(index) ?? '';
}

function logRoutes(port, host, data) {
    console.log(chalk.bold('Endpoints:'));
    if (Object.keys(data).length === 0) {
        console.log(chalk.gray(`No endpoints found`));
        return;
    }
    console.log(Object.keys(data)
        .map((key) => `${chalk.gray(`http://${host}:${port}/`)}${chalk.blue(key)}`)
        .join('\n'));
}

export const listenFunc = (port, host, router) => {
    const db = router.db
    console.log([
        chalk.bold(`JSON Server started on PORT :${port}`),
        chalk.gray('Press CTRL-C to stop'),
        '',
        chalk.magenta(randomItem(kaomojis)),
        '',
        chalk.bold('Index:'),
        chalk.gray(`http://localhost:${port}/`),
        '',
        chalk.bold('Static files:'),
        chalk.gray('Serving ./public directory if it exists'),
        '',
    ].join('\n'));
    logRoutes(port, host, db.getState());
}
