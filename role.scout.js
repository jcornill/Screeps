var config = require('config')

module.exports =
{
    run : function(creep)
    {
		if (creep.memory.scoutId == null)
		{
			for (var i = 0; i < config.mapData.scoutingMap.length; i++)
			{
				if (Memory.ScoutedMap[i] == null)
				{
					creep.memory.scoutId = i;
					Memory.ScoutedMap[i] = creep.name;
					break;
				}
			}
		}
		else
		{
			var posTarget = new RoomPosition(25, 25, config.mapData.scoutingMap[creep.memory.scoutId]);
			var sources;
			creep.moveTo(posTarget);
			var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
			if (hostiles.length > 0 && Memory.DefendPos == null)
			{
			    if (hostiles[0].room.owner == null)
				    Memory.DefendPos = hostiles[0].pos.roomName;
			}
			if (hostiles.length > 0 && Memory.DefendPos != null)
			{
				sources = creep.room.find(FIND_SOURCES,
		        {
		            filter: (source) =>
		            {
		                return (Memory.MiningSourcesId.includes(source.id) == true);
		            }
		        });
				for (var i in sources)
				{
				    var source = sources[i];
					var index = Memory.MiningSourcesId.indexOf(source.id);
					Memory.MiningSourcesId.splice(index, 1);
					Memory.MiningSourcesRoomName.splice(index, 1);
				}
			}
			else
			{
				sources = creep.room.find(FIND_SOURCES,
		        {
		            filter: (source) =>
		            {
		                return (Memory.MiningSourcesId.includes(source.id) == false);
		            }
		        });
				for (var i in sources)
				{
				    var source = sources[i];
					Memory.MiningSourcesId.push(source.id);
					Memory.MiningSourcesRoomName.push(source.pos.roomName);
				}
			}
		}
		return (false);
    }
};
