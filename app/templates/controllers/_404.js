(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                res.render("404", getViewData("404", "", req.session.userID));
            }
        };
    };
})();