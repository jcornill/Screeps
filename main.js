var utilsOther = require('utils.other')
var spawn = require('main.spawn')
var role = require('main.role')
var building = require('main.building')
var config = require('config')

module.exports.loop = function ()
{
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    utilsOther.cleanMemory();
    d2 = new Date().getTime();
    console.log("Cleaning memory - " + (d2 - d1) + "%");
    d1 = new Date().getTime();
    spawn.spawn();
    d2 = new Date().getTime();
    console.log("Spawning creep - " + (d2 - d1) + "%");
    d1 = new Date().getTime();
    building.run();
    d2 = new Date().getTime();
    console.log("Processing building - " + (d2 - d1) + "%");
    d1 = new Date().getTime();
    role.run();
    d2 = new Date().getTime();
    console.log("Processing creep - " + (d2 - d1) + "%");
    if (Game.cpu.getUsed() > 50)
        console.log("WARNING - HEAVY CPU USAGE - " + Game.cpu.getUsed() + "/" + Game.cpu.bucket);
    // 01/12 20:33 RESET
    // Tick 42887
    // TickTime 167030686
    // Tick Moy 3896
    var d = new Date();
    var diff = d.getTime() - Memory.date;
    Memory.tick = Memory.tick + 1;
    Memory.tickTime = (Memory.tickTime + diff);
    console.log("tick moyen : " + Math.ceil(Memory.tickTime / Memory.tick) + " lastTick : " + diff);
    Memory.date = d.getTime();
}
