var path = require('path');
var fs = require('fs-extra');
var thinky = require('thinky')(api.config.rethinkdb);

module.exports = {
    loadPriority:  1000,
    startPriority: 1000,
    stopPriority:  1000,
    initialize: function(api, next){
        api.models = {};
        api.rethinkdb = {
            connect: function(){
                var dir = path.normalize(api.config.rethinkdb.modelPath);
                fs.readdirSync(dir).forEach(function(file){
                    var nameParts = file.split("/");
                    var name = nameParts[(nameParts.length - 1)].split(".")[0];
                    api.models[name] = require(dir + '/' + file);
                });

                if(api.config.rethinkdb.session) {
                    thinky.createModel("session", {});
                }
            }
        };
        next();
    },
    start: function(api, next){
        if(api.config.rethinkdb.enable) {
            api.rethinkdb.connect(next);
        }
    }
};

module.exports = thinky;