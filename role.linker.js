var config = require("config")
var utils = require("utils.creep")

module.exports =
{
    run : function(creep)
    {
        //var stock = utils.getBestStorage(creep);
        //TODO: Hard coded
        var stock = Game.getObjectById(config.mainStorage);
        if (stock != null)
        {
            if (!creep.pos.isNearTo(stock))
                creep.moveTo(stock);
            else
            {
                var link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
	            {
		        	filter: (structure) =>
		        	{
		        		return ((structure.structureType == STRUCTURE_LINK));
		    	    }
	        	});
                //console.log(link + "   " + creep.transfer(link, RESOURCE_ENERGY));
                if (creep.withdraw(stock, RESOURCE_ENERGY) != OK)
                    if (creep.transfer(link, RESOURCE_ENERGY) != OK)
                        creep.moveTo(link);
            }
        }
        return (stock == null);
    }
};