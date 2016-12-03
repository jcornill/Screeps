module.exports =
{
    cleanMemory: function()
    {
        for(var name in Memory.creeps)
        {
            if(Game.creeps[name] == null)
            {
				var creepRole = Memory.creeps[name].role;
                if (creepRole == "sminer")
                {
                    Memory.StaticMineur[Memory.creeps[name].miningId] = null;
                    if (Game.creeps[Memory.HaulerTarget[Memory.creeps[name].miningId]] != null)
				    	Game.creeps[Memory.HaulerTarget[Memory.creeps[name].miningId]].memory.provideId = null;
					Memory.HaulerTarget[Memory.creeps[name].miningId] = null;
                }
				else if (creepRole == "provider")
				{
					Memory.HaulerTarget[Memory.creeps[name].provideId] = null;
				}
				else if (creepRole == "scout")
				{
					Memory.ScoutedMap[Memory.creeps[name].scoutId] = null;
				}
                delete Memory.creeps[name];
            }
        }
    }
};
