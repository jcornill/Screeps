var utils = require('utils.creep')

module.exports = {
    run: function(creep)
    {
        if (!utils.getResource(creep))
        {
			var structureTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
			{
				filter: (structure) =>
				{
					return ((structure.structureType == STRUCTURE_EXTENSION
						  || structure.structureType == STRUCTURE_SPAWN)
						  && structure.energy < structure.energyCapacity);
				}
			});
            if (structureTarget != null)
            {
                if (creep.transfer(structureTarget, RESOURCE_ENERGY) != OK)
                    creep.moveTo(structureTarget);
            }
        }
        return (structureTarget != null);
    }
};
