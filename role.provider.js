var config = require("config")
var utils = require("utils.creep")

module.exports = {
    run: function(creep)
    {
		if (creep.memory.provideId == null)
		{
			for (var i = 0; i < Memory.MiningSourcesId.length; i++)
			{
				if (Memory.StaticMineur[i] != null)
				{
					if (Memory.HaulerTarget[i] == null)
					{
						creep.memory.provideId = i;
						Memory.HaulerTarget[i] = creep.name;
						break;
					}
				}
			}
		}
		if (utils.isFull(creep))
		{
			// TODO: Hard coded
		//	if (creep.room.name != "W5N7")
		//	{
				var stock = Game.getObjectById(config.mainStorage);
				if (creep.transfer(stock, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
					creep.moveTo(stock);
		//	}
		}
		else if (creep.memory.provideId != null)
		{
			var mineur = Game.creeps[Memory.StaticMineur[creep.memory.provideId]];
			if (mineur != null)
				creep.moveTo(mineur.pos);
		}
        return (false);
    }
};
