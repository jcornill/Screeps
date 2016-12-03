var config = require('config')
var utils = require("utils.creep")

module.exports = {
	testSpawnCreep: function(bdRatio, spawn, roleName)
	{
		var body = [];
		var lastOk = [];
		var nb = 0;
		for (var j = 0; j < bdRatio.ratioLimit; j++)
		{
		    nb = j;
			//TODO : 3 is hard coded
			for (var i = 0; i < 3; i++)
			{
				//TODO : this don't use the ratio you need to use it
				body.push(bdRatio.parts[i]);
			}
			if (spawn.canCreateCreep(body) == OK)
			{
			    for (var k = 0; k < body.length; k++)
			        lastOk[k] = body[k];
			}
			else
			{
				break;
			}
		}
		if (lastOk != null && nb > (bdRatio.ratioMin - 1))
		{
			spawn.createCreep(lastOk, null, {role: roleName, startingRoom: spawn.room.name});
		}
	},
	spawnCreep: function(role, spawn)
	{
		switch (role)
		{
			case "harvester":
					module.exports.testSpawnCreep(config.bodyPartRatio.harvester, spawn, role);
			case "upgrader":
					module.exports.testSpawnCreep(config.bodyPartRatio.upgrader, spawn, role);
			case "builder":
					module.exports.testSpawnCreep(config.bodyPartRatio.builder, spawn, role);
			case "hauler":
					module.exports.testSpawnCreep(config.bodyPartRatio.hauler, spawn, role);
		}

	},
    spawn: function()
    {
        //number global
		var nbScouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout').length;
		var nbDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender').length;
	    var nbClaimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim').length;
	    var nbLinkers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linker').length;
	    var nbBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
	    var nbMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'sminer').length;
        var nbProviders = _.filter(Game.creeps, (creep) => creep.memory.role == 'provider').length;

		var myRooms = _.filter(Game.rooms, (room) => room.controller.owner != null);
		console.log("Spawn     |Harvesters|Haulers|Upgraders|Builders|Scouts|Miners|Providers|Linker|Defenders");
		for (var i = myRooms.length - 1; i >= 0;i--)
		{
			var myRoom = myRooms[i];
			var mySpawns = myRoom.find(FIND_MY_SPAWNS);
			//TODO: Iterate trought all spawn in each room
		    var spawn = mySpawns[0];
		    if (mySpawns.length == 0)
		        continue;
			// Number per room
			var nbHarvestersRoom = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == myRoom.name).length;
			var nbUpgradersRoom = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == myRoom.name).length;
			var nbHaulersRoom = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name == myRoom.name).length;
			
            if (spawn.name == "Mar Sara")
			    console.log(" Mar Sara |      " + nbHarvestersRoom + "/3 |   " + nbHaulersRoom + "/2 |     " + nbUpgradersRoom + "/2 |    " + nbBuilders + "/5 |  " + nbScouts + "/" + config.mapData.scoutingMap.length + " |  " + nbMiners + "/" + Memory.MiningSourcesId.length + " |     " + nbProviders + "/" + Memory.MiningSourcesId.length + " |  " + nbLinkers + "/1 |  " + nbDefenders + "/" + ((Memory.DefendPos != null) ? config.spawner.MAX_DEFENDERS : 0));
			else if (spawn.name == "Korhal")
			    console.log("   Korhal |      " + nbHarvestersRoom + "/3 |   " + nbHaulersRoom + "/2 |     " + nbUpgradersRoom + "/2 |    " + nbBuilders + "/5 |  " + nbScouts + "/" + config.mapData.scoutingMap.length + " |  " + nbMiners + "/" + Memory.MiningSourcesId.length + " |     " + nbProviders + "/" + Memory.MiningSourcesId.length + " |  " + nbLinkers + "/1 |  " + nbDefenders + "/" + ((Memory.DefendPos != null) ? config.spawner.MAX_DEFENDERS : 0));
			
			//TODO: Change 2 for automatic detection safe mineral
			if (nbMiners < 2)
            {
                spawn.createCreep(config.bodyPart.sminer, null, {role: 'sminer', startingRoom: spawn.room.name});
            }
            //TODO: Change 2 for automatic detection safe mineral
            else if (nbProviders < 2)
            {
                spawn.createCreep(config.bodyPart.provider, null, {role: 'provider', startingRoom: spawn.room.name});
            }
			else if (nbHarvestersRoom < 3) // Per Room
//            if (nbHarvestersRoom < 2)
			{
			    module.exports.spawnCreep("harvester", spawn)
			}
			else if (nbBuilders < 5) // Global
			{
			    spawn.createCreep(config.bodyPart.builder, null, {role: 'builder', startingRoom: spawn.room.name});
			}
			else if (nbHaulersRoom < 2) // Per room
			{
			    module.exports.spawnCreep("hauler", spawn);
			}
			else if (nbUpgradersRoom < 2) // Per Room
			{
    			module.exports.spawnCreep("upgrader", spawn);
			}
			else if (nbScouts < ((config.spawner.MAX_SCOUTS != -1) ? config.spawner.MAX_SCOUTS : config.mapData.scoutingMap.length))
            {
    	        spawn.createCreep(config.bodyPart.scout, null, {role: 'scout', startingRoom: spawn.room.name});
            }
            else if (nbMiners < ((config.spawner.MAX_SMINERS != -1) ? config.spawner.MAX_SMINERS : Memory.MiningSourcesId.length))
            {
                spawn.createCreep(config.bodyPart.sminer, null, {role: 'sminer', startingRoom: spawn.room.name});
            }
            else if (nbProviders < ((config.spawner.MAX_PROVIDERS != -1) ? config.spawner.MAX_PROVIDERS : Memory.MiningSourcesId.length))
            {
                spawn.createCreep(config.bodyPart.provider, null, {role: 'provider', startingRoom: spawn.room.name});
            }
	    	else if (utils.spawnClaimer() && nbClaimers < 1)
	    	{
	    		spawn.createCreep(config.bodyPart.claimer, null, {role: 'claim', startingRoom: spawn.room.name});
	    	}
	    	//TODO: Change spawn globally to spawn in room that have links 
	    	else if (nbLinkers < 1)
	    	{
	    		spawn.createCreep(config.bodyPart.linker, null, {role: 'linker', startingRoom: spawn.room.name});
	    	}
	    	else if (nbDefenders < config.spawner.MAX_DEFENDERS && Memory.DefendPos != null)
	    	{
	    		spawn.createCreep(config.bodyPart.defender, null, {role: 'defender', startingRoom: spawn.room.name});
	    	}
		}
        /*

		*/
    }
};
