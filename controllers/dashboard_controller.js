var Burger = require("../models").Burger;
var user = require("../models").user;

module.exports = function(app) {

    //function to verify if is logged in
    function isLoggedIn(req, res, next) {
        var logData = {};

        if (req.isAuthenticated()) {
            console.log(logData);
            return next();

        }
        res.redirect('/signin');
    };

    //Route home
    app.get("/", function(req, res) {
        var isLog;
        if (req.isAuthenticated()) {
            isLog = true;
        } else {
            isLog = false;
        }
        var logData = {
            logStatus: isLog
        };
        console.log(logData.logStatus);
        res.render('index', logData);
    });

    //Route dashboard
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
                    userDataRes: result,
                    logStatus: true
                };
                res.render('profile', dbRecordsObject);
            });
    });

    //Route view events
    app.get('/events', function(req, res) {

        var logData = {
            logStatus: false
        };
        res.render('events', logData);
    });


};