/*global describe, beforeEach, it*/
"use strict";

var path    = require("path");
var helpers = require("yeoman-generator").test;
var assert  = require("assert");
var rimraf  = require("rimraf");

describe("Egress generator", function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator("egress:app", [
                "../../app"
            ]);
            done();
        }.bind(this));
    });

    it("creates expected files - bootstrap", function (done) {
        var templateFiles = [
            "config.js",
            "package.json",
            "README.md",
            ".gitignore",
            ".env"
        ];
        var remoteFiles = [
            "controllers/_404.js",
            "controllers/account.js",
            "controllers/home.js",
            "controllers/index.js",
            "controllers/join.js",
            "controllers/signin.js",
            "controllers/signout.js",
            "databases/database.yml",
            "databases/users.sql",
            "jade/404.jade",
            "jade/account.jade",
            "jade/forms/join.jade",
            "jade/forms/signin.jade",
            "jade/includes/head.jade",
            "jade/includes/nav.jade",
            "jade/includes/scripts.jade",
            "jade/index.jade",
            "jade/join.jade",
            "jade/signin.jade",
            "public/css/bootstrap.css.map",
            "public/css/bootstrap.min.css",
            "public/css/egress.css",
            "public/fonts/glyphicons-halflings-regular.eot",
            "public/fonts/glyphicons-halflings-regular.svg",
            "public/fonts/glyphicons-halflings-regular.ttf",
            "public/fonts/glyphicons-halflings-regular.woff",
            "public/js/bootstrap.min.js",
            "public/js/egress-validators.js",
            "public/js/html5shiv.js",
            "public/js/jquery-1.10.2.min.map",
            "public/js/jquery.js",
            "public/js/validator.min.js",
            "routes/index.js",
            "routes/utils.js",
            "app.js",
            "Procfile"
        ];

        var egressConfig = {
            "framework": "bootstrap",
            "siteName": "Egress-test-site",
            "siteAuthor": "Shakeel Mohamed",
            "siteDescription": "Egress test site."
        };

        helpers.mockPrompt(this.app, egressConfig);

        this.app.options["skip-install"] = true;

        this.app.run({}, function () {
            helpers.assertFiles(templateFiles);
            helpers.assertFiles(remoteFiles);
            var generatedConfig = require("./temp/config.js");
            for (var i in egressConfig) {
                if (egressConfig[i] !== "bootstrap") {
                    assert.equal(generatedConfig[i], egressConfig[i]);
                }
            }
            done();
        });
    });
    
    it("creates expected files - foundation", function (done) {
        var templateFiles = [
            "config.js",
            "package.json",
            "README.md",
            ".gitignore",
            ".env"
        ];
        var remoteFiles = [
            "controllers/_404.js",
            "controllers/account.js",
            "controllers/home.js",
            "controllers/index.js",
            "controllers/join.js",
            "controllers/signin.js",
            "controllers/signout.js",
            "databases/database.yml",
            "databases/users.sql",
            "jade/404.jade",
            "jade/account.jade",
            "jade/forms/join.jade",
            "jade/forms/signin.jade",
            "jade/includes/head.jade",
            "jade/includes/nav.jade",
            "jade/includes/scripts.jade",
            "jade/index.jade",
            "jade/join.jade",
            "jade/signin.jade",
            "public/css/egress.css",
            "public/css/normalize.css",
            "public/css/foundation.css",
            "public/css/foundation.min.css",
            "public/js/egress-validators.js",
            "public/js/validator.min.js",
            "public/js/foundation.min.js",
            "public/js/vendor/fastclick.js",
            "public/js/vendor/jquery.cookie.js",
            "public/js/vendor/jquery.js",
            "public/js/vendor/modernizr.js",
            "public/js/vendor/placeholder.js",
            "routes/index.js",
            "routes/utils.js",
            "app.js",
            "Procfile"
        ];

        var egressConfig = {
            "framework": "foundation",
            "siteName": "Egress-test-site",
            "siteAuthor": "Shakeel Mohamed",
            "siteDescription": "Egress test site."
        };

        helpers.mockPrompt(this.app, egressConfig);

        this.app.options["skip-install"] = true;

        this.app.run({}, function () {
            helpers.assertFiles(templateFiles);
            helpers.assertFiles(remoteFiles);
            var generatedConfig = require("./temp/config.js");
            for (var i in egressConfig) {
                if (egressConfig[i] !== "foundation") {
                    assert.equal(generatedConfig[i], egressConfig[i]);
                }
            }
            done();
        });
    });

    afterEach(function (done) {
        rimraf(path.join(__dirname, "temp"), function (err) {
            done(err);
        });
    });
});