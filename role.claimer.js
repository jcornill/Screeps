var config = require("config")

module.exports = {
    run : function(creep)
    {
		var target;
        for (var i = 0; i < config.mapData.claimMap.length; i++)
		{
			var map = config.mapData.claimMap[i];
			if (Game.rooms[map].controller.owner == null)
			{
				target = Game.rooms[map].controller;
				break;
			}
		}
		if (target != null)
		{
			if (creep.claimController(target) == ERR_NOT_IN_RANGE)
				creep.moveTo(target);
		}
		return (false);
    }
};
