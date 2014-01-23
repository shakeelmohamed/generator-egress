var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");
var Browser = require("zombie");
var mocha = require("mocha");
var pg = require("pg");

var app = require("../app");
var port = process.env.PORT || 5000;
var server = app.listen(port);
var browser = new Browser();
browser.site = "http://localhost:"+port;

var testuser = {username: "hehehahahoho00001234", email: "nowayjose@donteventhinkaboutit.com", password: "imjustalittletestuser"};

describe("Bcrypt", function(){
    describe("Test user's password", function() {
        it("should match the encrypted password", function() {
            assert( bcrypt.compareSync(testuser.password, bcrypt.hashSync(testuser.password)) );
        });
    });
});

describe("PostgreSQL", function(){
    describe("credentials", function() {
        it("should connect to a database, and query the version", function(done) {
            pg.connect(process.env.DATABASE_URL, function (err, client) {
                if(err) {
                    console.log(err);
                    assert.ifError(err, "Unable to connect to database.");
                }
                else {
                    client.query("select version();", function(err, result) {
                        if(err) {
                            assert.ifError(err, "Unable to query PostgreSQL version.");
                            done();
                        }
                        else {
                            assert.equal(true, !!result, "Result object invalid.");
                            assert(result.rows.length > 0, "No Results returned.");
                            assert(result.rows[0].version.length > 0, "PostgreSQL version not returned.");
                            done();
                        }
                    });
                }
            });
        });
    });
});

describe("Join form:", function() {
    describe("elements", function(){
        it("should match what is expected", function(done) {
            browser.visit("/join")
            .then(function() {
                assert.equal(browser.text("h2"), "Join "+app.locals.siteName);
                assert.ok(browser.query("#user"), "Couldn't find user field.");
                assert.ok(browser.query("#email"), "Couldn't find email field.");
                assert.ok(browser.query("#password"), "Couldn't find password field.");
                assert.ok(browser.query("#register"), "Couldn't find join button.");
            })
            .then(done);
        });
    });
    describe("script", function(){
        it("should create a test user via the registration form", function(done) {
            browser.visit("/join", function(){
                browser.fill("user", testuser.username);
                browser.fill("email", testuser.email);
                browser.fill("password", testuser.password);
                browser.pressButton("register", function() {
                    assert.ok(browser.success);
                    done();
                });
                //At this point the user will have been logged in, and redirected to /account
            });
        });
    });
});

describe("Logout:", function(){
    describe("script", function(){
        it("should logout the test user", function(done){
            browser.visit("/logout", function(){
                assert.ok(browser.success);
                done();
                //At this point the user will have been logged out, and redirected to /login
            });
        });
    });
});

describe("Login form:", function(){
    describe("elements", function(){
        it("should match what is expected", function(done) {
            browser.visit("/login")
            .then(function() {
                assert.equal(browser.text("h2"), "Login to "+app.locals.siteName);
                assert.ok(browser.query("#user"), "Couldn't find user field.");
                assert.ok(browser.query("#password"), "Couldn't find password field.");
                assert.ok(browser.query("#login"), "Couldn't find login button.");
            })
            .then(done);
        });
    });

    describe("script", function(){
        it("should login as a user", function(done) {
            browser.visit("/login", function(){
                browser.fill("user", testuser.username);
                browser.fill("password", testuser.password);
                browser.pressButton("login", function() {
                    assert.ok(browser.success);
                    done();
                });
            });
        });
    });
});

describe("Test user:", function(){
    it("should be deleted from the PostgreSQL database", function(done) {
        pg.connect(process.env.DATABASE_URL, function (err, client) {
            if(err) {
                console.log(err);
                assert.ifError(err, "Unable to connect to database.");
            }
            else {
                client.query("delete from users where username = $1", [testuser.username], function(err, result) {
                    if(err) {
                        assert.ifError(err, "Unable to delete test user.");
                        done();
                    }
                    else {
                        assert.equal(true, !!result, "Result object invalid.");
                        assert.equal(1 , result.rowCount, "Test user not found in database.");
                        done();
                    }
                });
            }
        });
    });
});