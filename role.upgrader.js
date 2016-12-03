var utils = require('utils.creep')

module.exports = {

    run: function(creep)
    {
        if (!utils.getResource(creep))
        {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);
        }
        return (true);
    }
};
