exports.init = function (app) {
    var pg = require("pg");
    var jade = require("jade");
    var bcrypt = require("bcrypt-nodejs");
    var controllerSet = require("../controllers");

    function getViewData (title, pathSuffix, userID, message) {
        // Set app.locals in web.js; this function gets passed around to all controllers
        return {
            siteName: app.locals.siteName,
            author: app.locals.siteAuthor,
            title: title,
            loc: pathSuffix,
            user: userID,
            msg: message
        };
    }

    function checkAuth(req, res, next) {
        if (!req.session.userID) {
            //Send user to the login page if they're not authorized
            res.redirect("login");
        }
        else {
            next();
        }
    }

    //Lovely controller routing
    var controllers = new controllerSet(getViewData);

    app.get("/", controllers.home.get);

    app.get("/404", controllers._404.get);

    app.get("/logout", controllers.logout.get);

    app.get("/account", checkAuth, controllers.account.get);

    app.get("/login", controllers.login.get);
    app.post("/login", controllers.login.post);
    
    app.get("/join", controllers.join.get);
    app.post("/join", controllers.join.post);
};