module.exports = function(grunt) {
    var packageFile = grunt.file.readJSON("package.json");
    
    grunt.initConfig({
        pkg: packageFile,
        jshint: {
            all: ["Gruntfile.js", "app.js", "config.js", "index.js", "controllers/*.js", "routes/*.js", "test/*.js"],
            options: packageFile.jshintConfig
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
};