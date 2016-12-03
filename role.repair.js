var utilsBuild = require('utils.building')
var utils = require('utils.creep')

module.exports = {
    run :function(creep)
    {
		var repTarget = utilsBuild.getBuildingToRepair(creep);
		//console.log(repTarget);
        if (repTarget != null)
        {
            if (!utils.getResource(creep))
            {
                if (creep.repair(repTarget) == ERR_NOT_IN_RANGE)
                    creep.moveTo(repTarget);
            }
        }
        return(repTarget != null);
    }
};
