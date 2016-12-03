var config = require('config')

module.exports = {

    isFull: function(creep)
    {
        return (creep.carryCapacity == creep.carry.energy);
    },

    getResource: function(creep)
    {
        var d1 = new Date().getTime();
        if (creep.memory.working == null)
            creep.memory.working = false;
        if (creep.memory.working && creep.carry.energy == 0)
        {
            creep.memory.working = false;
        }
        if (!creep.memory.working && module.exports.isFull(creep))
        {
            creep.memory.working = true;
            creep.memory.targetStockId = null;
        }
        if (!creep.memory.working)
        {
            var stock;
            // If no target set in memory
            if (creep.memory.targetStockId == null)
            {
                stock = module.exports.getBestStorage(creep);
                var link = module.exports.getBestLink(creep);
                // Get the best between link and storage
                if (link != null && stock != null)
                    stock = creep.pos.findClosestByPath([stock, link]);
                // Special case if it's a builder
                if (creep.memory.role == "builder" && stock == null)
                    stock = Game.getObjectById(config.mainStorage);
                // If we found a stock, keep her id in memory
                if (stock != null)
                    creep.memory.targetStockId = stock.id;
            }
            // Else if the creep already have a target
            else
            {
                // Get the structure
                stock = Game.getObjectById(creep.memory.targetStockId);
                // If no energy left, reset the memory target and the structure
                if (stock.energy == 0)
                {
                    creep.memory.targetStockId = null;
                    return (true);
                }
            }
            // if the stock is not null, move to it and withdraw resources
			if (stock != null)
			{
			    if (creep.withdraw(stock, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
					creep.moveTo(stock);
			}
			// Else search for a source to mine
            else
            {
                var source = module.exports.getBestSource(creep);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source);
            }
        }
        var d2 = new Date().getTime();
        //console.log("Utils.getResource() - time " + (d2 - d1) + "%");
        return (!creep.memory.working);
    },

	getBestStorage: function(creep)
	{
		var result = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
		{
			filter: (structure) =>
			{
				return ((structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0);
			}
		});
		return (result);
	},

    getBestLink: function(creep)
	{
		var result = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
		{
			filter: (structure) =>
			{
				return ((structure.structureType == STRUCTURE_LINK) && structure.energy > 0 && structure.energy != structure.energyCapacity);
			}
		});
		return (result);
	},

    getBestSource: function(creep)
    {
        var returned = creep.pos.findClosestByPath(FIND_SOURCES,
        {
            filter: (structure) =>
            {
                return (structure.energy > 0);
            }
        });
        return (returned);
    },

	spawnClaimer: function ()
	{
		for (var i = 0; i < config.mapData.claimMap.length; i++)
		{
			var map = config.mapData.claimMap[i];
			if (Game.rooms[map].controller.owner == null)
			{
				return (true);
			}
		}
		return(false);
	}
};
