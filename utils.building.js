var config = require('config')

module.exports = {

    getBuildingToUseHarvest: function(creep)
    {
        var returned;
        // If creep don't have target, we get one
        if (creep.memory.targetHarvestId == null)
        {
            returned = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
		    {
		    	filter: (structure) =>
		    	{
		    		return ((structure.structureType == STRUCTURE_EXTENSION
		    			  || structure.structureType == STRUCTURE_SPAWN)
		    			  && structure.energy < structure.energyCapacity);
		    	}
			});
			// set the target Harvest Id
		    creep.memory.targetHarvestId = returned.id;
        }
        // Else we get target stored in memory
        else
        {
            returned = Game.getObjectById(creep.memory.targetHarvestId);
            // If the target is not valid
            if (returned.energy == returned.energyCapacity);
            {
                // reset all
                creep.memory.targetHarvestId = null;
                returned = null;
            }
        }
        return (returned);
    },

    getBuildingToBuild: function(creep)
    {
        var cSites = Game.constructionSites;
        var returned;
        for (var key of Object.keys(cSites))
        {
            returned = cSites[key];
//            if (returned.structureType == STRUCTURE_LINK)
                break;
        }
        //console.log(returned = cSites.filter((site) => {return (site.structureType == STRUCTURE_LINK);}));
        //returned = Game.getObjectById(Object.keys(cSites)[0]);
        if (returned != null)
            console.log(returned);
		// TODO : BUILDING PRIORITY

        return (returned);
    },

	getStructureToRefill: function(creep)
	{
		var returned = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
        {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_TOWER
                      && structure.energy < structure.energyCapacity);
            }
        });
		return (returned);
	},

    getBuildingToRepair: function(creep)
    {
        var returned = null;
        returned = creep.pos.findClosestByPath(FIND_STRUCTURES,
        {
            filter: (structure) =>
            {
                return (structure.hits != structure.hitsMax && structure.hits < 2500);
            }
        });
//        var myRooms = _.filter(Game.rooms, (room) => room.controller.owner != null);
//		for (var i = myRooms.length - 1; i >= 0;i--)
//		{
//			var myRoom = myRooms[i];
//			returned = myRoom.find(FIND_STRUCTURES,
//			{
//			    filter: (structure) =>
//			    {
//			        return (structure.hits != structure.hitsMax && structure.hits <= 2500);
//			    }
//			});
//			if (returned.length > 0)
//			{
//			    returned = creep.pos.findClosestByPath(returned);
//			    break;
//			}
//		}
        return (returned);
    }
};
