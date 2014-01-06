module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      // define the files to lint
      files: ["gruntfile.js", "src/**/*.js", "test/**/*.js"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.registerTask("default", "jshint");
};