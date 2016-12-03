var utils = require('utils.creep')
var utilsBuild = require('utils.building')

module.exports = {
    run :function(creep)
    {
        var buildTarget = utilsBuild.getBuildingToBuild(creep);
        if (buildTarget != null)
        {
            if (!utils.getResource(creep))
            {
                if (creep.build(buildTarget) != OK)
                    creep.moveTo(buildTarget);
            }
        }
        return(buildTarget != null);
    }
};
