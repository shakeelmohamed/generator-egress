(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                delete req.session.userID;
                res.redirect("/login");
            }
        };
    };
})();