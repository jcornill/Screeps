var config = require('config')

module.exports =
{
    run: function ()
    {
        var towers = Game.rooms[config.mapData.mainRoom].find(FIND_STRUCTURES,
        {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_TOWER);
                }
        });
        for(var tower of towers)
        {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target != null)
                tower.attack(target);
            else
            {
			    target = tower.pos.findClosestByRange(FIND_MY_CREEPS,
			    {
				    filter: (creep) =>
				    {
                        return (creep.hits < creep.hitsMax);
                    }
			    });
	            if(target != null)
	                tower.heal(target);
            }
        }
    }
};
