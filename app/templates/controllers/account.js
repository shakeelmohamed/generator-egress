(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                res.render("account", getViewData("Account", "account", req.session.userID));
            }
        };
    };
})();