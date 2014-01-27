"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");


var EgressGenerator = module.exports = function EgressGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on("end", function () {
        this.installDependencies({ skipInstall: options["skip-install"] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(EgressGenerator, yeoman.generators.Base);

EgressGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: "siteName",
            message: "What would you like to call your site?"
        },
        {
            name: "siteAuthor",
            message: "Who is the site author?"
        },
        {
            name: "siteDescription",
            message: "Describe your site:"
        },
    ];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;
        this.siteAuthor = props.siteAuthor;
        this.siteDescription = props.siteDescription;

        cb();
    }.bind(this));
};

EgressGenerator.prototype.app = function app() {
    var directories = ["controllers", "databases", "jade", "public", "routes"];

    for (var d in directories) {
        this.directory(directories[d]);
    }

    var files = ["app.js", "index.js", "Procfile"];

    for (var f in files) {
        this.copy(files[f]);
    }
};

EgressGenerator.prototype.templateFiles = function projectfiles() {
    var files = ["config.js", "package.json", "README.md"];

    for (var f in files) {
        this.template(files[f]);
    }

    /*

    this.template("config.js");
    this.template("package.json");
    //TODO: in readme.md with pre-production steps, and maybe some tests to verify
    //... these include: setting a better secret, siteName, siteAuthor, etc.
    this.template("README.md");

    */
};