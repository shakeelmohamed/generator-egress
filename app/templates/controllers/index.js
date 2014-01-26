(function(){
    module.exports = function ControllerSet(getViewData) {
        //Here we're exporting an object constructor

        // Get a list of all files in the controllers folder
        var controllers = require("fs").readdirSync(__dirname);

        for(var i=0; i<controllers.length; i++) {
            //Try tp remove the .js extension from all of these files
            var name = controllers[i].replace(".js", "");
            //Skip if: weird error, is this file, or isn"t a js file
            if(!name || name == "index" || controllers[i].indexOf(".js") != name.length) {
                continue;
            }
            //ex: this["home"] = require("./home.js")(getViewData);
            this[name] = require("./"+name)(getViewData);
        }
    };
})();