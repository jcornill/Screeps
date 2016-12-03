var config = require("config")
var utils = require("utils.creep")

module.exports = {
    run: function(creep)
    {
		if (creep.memory.miningId == null)
		{
			for (var i = 0; i < Memory.MiningSourcesId.length; i++)
			{
				if (Memory.StaticMineur[i] == null)
				{
					Memory.StaticMineur[i] = creep.name;
					creep.memory.miningId = i;
					break;
				}
			}
		}
		if (creep.getActiveBodyparts(WORK) == 0)
		{
		    creep.moveTo(new RoomPosition(25, 25, config.mapData.mainRoom));
		    return (false);
		}
        var source = Game.getObjectById(Memory.MiningSourcesId[creep.memory.miningId]);
		if (source == null)
		{
		    if (Memory.MiningSourcesRoomName[creep.memory.miningId] == null)
		        creep.moveTo(new RoomPosition(25, 25, config.mapData.mainRoom));
		    else
		    	creep.moveTo(new RoomPosition(25, 25, Memory.MiningSourcesRoomName[creep.memory.miningId]));
		}
		else
		{
			if (!utils.isFull(creep))
			{
	        	if (creep.harvest(source) == ERR_NOT_IN_RANGE)
	            	creep.moveTo(source);
			}
			creep.transfer(Game.creeps[Memory.HaulerTarget[creep.memory.miningId]], RESOURCE_ENERGY);
			//if (utils.isFull(creep))
				//console.log("WARNING - STATIC MINEUR FULL");
		}
        return (false);
    }
};
