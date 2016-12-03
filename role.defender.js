var config = require("config")

module.exports =
{
    run : function(creep)
    {
        var defPos;
        if (Memory.DefendPos != null)
        	defPos = new RoomPosition(25,25,Memory.DefendPos);
        if (creep.getActiveBodyparts(ATTACK) == 0)
		{
		    creep.moveTo(new RoomPosition(25, 25, config.mapData.mainRoom));
		    return (false);
		}
		if (defPos != null && creep.pos.roomName != "W1N8")
		{
			if (creep.pos.roomName != defPos.roomName)
			{
				creep.moveTo(defPos);
			}
			else
			{
				var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
	            if(target != null)
				{
	                creep.attack(target);
					creep.moveTo(target, {reusePath: 1});
				}
				else
				{
					Memory.DefendPos = null;
				}
			}
		}
		else
		{
		    creep.moveTo(new RoomPosition(20, 5, "W1N8"), {reusePath: 200});
		}
        return (false);
    }
};
