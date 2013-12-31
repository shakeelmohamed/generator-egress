'use strict';
var util = require('util');
var path = require('path');
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
      name: 'packageName',
      message: 'What do you name your node package? (this will be slugified)'
    },
    {
      name: 'siteName',
      message: 'What do you want to call your site?'
    },
    {
      name: 'siteAuthor',
      message: 'Who is the site author?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    this.siteName = props.siteName;
    this.siteAuthor = props.siteAuthor;

    cb();
  }.bind(this));
};

NopejsGenerator.prototype.app = function app() {
  this.mkdir('controllers');

  this.mkdir('jade');
  this.mkdir('jade/includes');

  this.mkdir('public');

  this.mkdir('routes');

  //this.template('Gruntfile.js', 'Gruntfile.js');

  //this.template('_bower.json', 'bower.json');
  //this.template('_config.json', 'config.json');
  //this.template('_package.json', 'package.json');
};

NopejsGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};

NopejsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
