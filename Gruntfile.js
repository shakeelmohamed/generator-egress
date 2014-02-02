module.exports = function(grunt) {
    var packageFile = grunt.file.readJSON("package.json");
    
    grunt.initConfig({
        pkg: packageFile,
        jshint: {
            all: [
                "Gruntfile.js",
                "app/index.js",
                "app/templates/config.js",
                "test/*.js"
            ],
            options: packageFile.jshintConfig
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["jshint"]);
};