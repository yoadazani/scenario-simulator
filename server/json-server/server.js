const jsonServer = require('json-server')
const {filtersMiddleware, idsMiddleware, listenFunc, bulkUpdate, bulkPatch, updateById, patchById, deleteById,
    bulkDelete, bulkCreate
} = require("./service");
const server = jsonServer.create()
const database = require('./database/')

const port = 8081
server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

const router = jsonServer.router(database())

server.use(idsMiddleware(router))

server.get('/:name', filtersMiddleware(router));

server.post('/:name/bulk', async (req, res) => {
    const { name } = req.params;
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: "data[] is required" });
    }

    const createdItems = await bulkCreate(router.db, name, data);

    if (!createdItems || createdItems.length === 0) {
        return res.status(400).json({ error: "No items were created" });
    }

    res.json({
        created: createdItems.length,
        items: createdItems
    })
})

server.put('/:name/bulk', async (req, res) => {
    const { name } = req.params
    const { ids = [], data = {} } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "ids[] is required" });
    }

    const updatedItems = await bulkUpdate(router.db, name, ids, data)

    if (!updatedItems || updatedItems.length === 0) {
        return res.status(404).json({ error: "No items were updated" });
    }

    res.json({
        updated: updatedItems.length,
        items: updatedItems
    });
});

server.patch('/:name/bulk', async (req, res) => {
    const { name } = req.params;
    const { ids = [], data = {} } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "ids[] is required" });
    }

    const updatedItems = await bulkPatch(router.db, name, ids, data);

    if (!updatedItems || updatedItems.length === 0) {
        return res.status(404).json({ error: "No items were updated" });
    }

    res.json({
        updated: updatedItems.length,
        items: updatedItems
    });
});

server.delete('/:name/bulk', async (req, res) => {
    const { name } = req.params;
    const { ids = [] } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "ids[] is required" });
    }

    const deletedItems = await bulkDelete(router.db, name, ids);

    if (!deletedItems || deletedItems.length === 0) {
        return res.status(404).json({ error: "No items were deleted" });
    }

    res.json({
        deleted: deletedItems.length,
        items: deletedItems
    });
});

server.put('/:name/:id', async (req, res) => {
    const { name, id } = req.params
    const data = req.body;

    if (!id) {
        return res.status(400).json({ error: "id is required" });
    }

    const updatedItem = await updateById(router.db, name, id, data)

    if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
});

server.patch('/:name/:id', async (req, res) => {
    const { name, id } = req.params
    const data = req.body;

    if (!id) {
        return res.status(400).json({ error: "id is required" });
    }

    const updatedItem = await patchById(router.db, name, id, data);

    if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
});

server.delete('/:name/:id', async (req, res) => {
    const { name, id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "id is required" });
    }

    const deletedItem = await deleteById(router.db, name, id);

    if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json({
        deleted: true,
        item: deletedItem
    });
});

server.use(router)

server.listen(port, () => listenFunc(port, 'localhost', router));
