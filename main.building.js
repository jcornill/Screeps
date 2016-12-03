var tower = require('building.tower')
var link = require("building.link")

module.exports =
{
    run: function ()
    {
        tower.run();
        link.run();
    }
};