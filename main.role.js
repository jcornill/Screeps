var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleRepair = require('role.repair')
var roleHauler = require('role.hauler')
var roleScout = require('role.scout')
var roleSminer = require("role.sminer")
var roleProvider = require("role.provider")
var roleDefender = require("role.defender")
var roleClaim = require("role.claimer")
var roleLink = require("role.linker")
var roleAll = require('role.all')
var config = require('config')

module.exports =
{
    run: function()
    {
        var d1 = new Date().getTime();
        var d2 = new Date().getTime();
        //console.log("---------------------------------");
        for (var creepName in Game.creeps)
        {
            d1 = new Date().getTime();
            var creep = Game.creeps[creepName];
            if (creep.memory.role == 'harvester')
            {
                module.exports.work(creep, config.workPriority.harvester);
            }
            else if (creep.memory.role == 'upgrader')
            {
                module.exports.work(creep, config.workPriority.upgrader);
            }
            else if (creep.memory.role == 'builder')
            {
                module.exports.work(creep, config.workPriority.builder);
            }
            else if (creep.memory.role == 'hauler')
            {
                module.exports.work(creep, config.workPriority.hauler);
            }
            else if (creep.memory.role == 'scout')
            {
                module.exports.work(creep, config.workPriority.scout);
            }
            else if (creep.memory.role == 'sminer')
            {
                module.exports.work(creep, config.workPriority.sminer);
            }
            else if (creep.memory.role == "provider")
            {
                module.exports.work(creep, config.workPriority.provider);
            }
			else if (creep.memory.role == "defender")
			{
				module.exports.work(creep, config.workPriority.defender);
			}
			else if (creep.memory.role == "claim")
			{
				module.exports.work(creep, config.workPriority.claimer);
			}
			else if (creep.memory.role == "linker")
			{
				module.exports.work(creep, config.workPriority.linker);
			}
			d2 = new Date().getTime();
//			if (creep.memory.targetStockId == null)
//			    console.log(creep.memory.role + " - " + creep.memory.startingRoom + " " + (d2 - d1) + "%");
        }
    },
    work: function(creep, workList)
    {
        for (var workId in workList)
        {
            if (module.exports.doWork(creep, workList[workId]))
                break;
        }
        // TODO: Delete this
        //if (creep.room.name == "W5N7")
        //    module.exports.doWork(creep, "upgrade");
    },
    doWork: function(creep, work)
    {
        //creep.say(creep.memory.role.substring(0,3) + " - " + work);
        switch(work)
        {
            case "harvest":
                return (roleHarvester.run(creep));
            case "build":
                return (roleBuilder.run(creep));
            case "repair":
                return (roleRepair.run(creep));
            case "upgrade":
                return (roleUpgrader.run(creep));
            case "haul":
                return (roleHauler.run(creep));
            case "scout":
                return (roleScout.run(creep));
            case "sminer":
                return (roleSminer.run(creep));
            case "provider":
                return (roleProvider.run(creep));
			case "defend":
				return (roleDefender.run(creep));
			case "claim":
				return (roleClaim.run(creep));
			case "link":
			    return (roleLink.run(creep));
        }
    }
};
