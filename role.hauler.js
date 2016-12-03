var utils = require('utils.creep')
var utilsbuilding = require ("utils.building")

module.exports = {

    run: function(creep)
    {
        if (!utils.getResource(creep))
        {
			var structureTarget = utilsbuilding.getStructureToRefill(creep);
            if (creep.transfer(structureTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(structureTarget);
        }
        return (structureTarget != null);
    }
};
