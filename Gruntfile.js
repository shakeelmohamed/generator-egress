module.exports = function(grunt) {
    var packageFile = grunt.file.readJSON("package.json");
    
    grunt.initConfig({
        pkg: packageFile,
        jshint: {
            all: [
                "app/index.js",
                "app/templates/app.js",
                "app/templates/index.js",
                "app/templates/config.js",
                "app/templates/controllers/*.js",
                "app/templates/routes/*.js",
                "app/templates/test/*.js"
            ],
            options: packageFile.jshintConfig
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
};