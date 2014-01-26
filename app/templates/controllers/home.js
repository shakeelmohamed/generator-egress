(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                res.render("index", getViewData("Home", "home", req.session.userID));
            }
        };
    };
})();