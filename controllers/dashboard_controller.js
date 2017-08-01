var Burger = require("../models").Burger;
var user = require("../models").user;

module.exports = function(app) {
    //function to verify if is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())

            return next();
        res.redirect('/signin');
    };
    app.get('/dashboard', isLoggedIn, function(req, res) {
        var userId = req.user.id;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log('user id :' + userId);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        user.findAll({
                where: {
                    id: userId
                }
            })
            .then(function(result) {
                var dbRecordsObject = {
                    userDataRes: result
                };
                res.render('profile', dbRecordsObject);
            });
    });
};