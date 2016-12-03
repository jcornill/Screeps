var config = require("config");

module.exports = {
    run: function()
    {
        var ELinks = Game.rooms[config.mapData.mainRoom].find(FIND_STRUCTURES,
        {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_LINK && structure.energy == structure.energyCapacity);
            }
        });
        if (ELinks.length == 0)
            return;
        var RLinks = Game.rooms[config.mapData.mainRoom].find(FIND_STRUCTURES,
        {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_LINK && structure.energy == 0);
            }
        });
        if (RLinks.length == 0)
            return;
        for (var El of ELinks)
        {
            var Rl = El.pos.findClosestByRange(RLinks);
            if (Rl != null)
            {
                El.transferEnergy(Rl, (Rl.energyCapacity - 1));
            }
        }
    }
};