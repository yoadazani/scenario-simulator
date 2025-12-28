const events = require("./events");
const ellipses = require("./ellipses");
const districts = require("./districts");
const subdistricts = require("./subdistricts");
const journals = require("./journals");
const forces = require("./forces");
const enums = require("./enums");
const tnufaEvents = require("./tnufa-events");
const protectedCities = require("./protected-cities");

module.exports = function () {
    return {
        events,
        ellipses,
        districts,
        subdistricts,
        journals,
        forces,
        enums,
        'protected-cities': protectedCities,
        'tnufa-events': tnufaEvents,
    };
};
