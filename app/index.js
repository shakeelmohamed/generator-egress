'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs-extra');
var yeoman = require('yeoman-generator');


var NopejsGenerator = module.exports = function NopejsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NopejsGenerator, yeoman.generators.Base);

NopejsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'siteName',
      message: 'What would you like to call your site?'
    },
    {
      name: 'siteAuthor',
      message: 'Who is the site author?'
    },
    {
      name: 'siteDescription',
      message: 'Describe your site:'
    },
  ];

  this.prompt(prompts, function (props) {
    this.siteName = props.siteName;
    this.siteAuthor = props.siteAuthor;
    this.siteDescription = props.siteDescription;

    cb();
  }.bind(this));
};

NopejsGenerator.prototype.app = function app() {
  //TODO: this is broken! The nope.js package overwrite it :(
  this.template('_package.json', 'package.json');
  //TODO: add in a readme.md with pre-production steps, and maybe some tests to verify
    //... these include: setting a better secret, siteName, siteAuthor, etc.
};

NopejsGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

/*
NopejsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
*/

NopejsGenerator.prototype.nopejsFiles = function nopejsFiles() {
  //TODO: remove this bower installation, make nopejs a dependency for the generator
    //... then do a manual copy process, with templating commands in some config file, etc.
    //... this means the nope.js config needs to be externalized slightly from the web.js file.
    //... don't copy over the nope.js package.json file.

  this.bowerInstall("shakeelmohamed/nopejs", { save: true }, function(){
    fs.copy('./bower_components/nopejs', './', function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
        fs.remove('./bower_components', function(err){
          if (err) return console.error(err);

          console.log("success!");
        });
      }
    });
  });
};