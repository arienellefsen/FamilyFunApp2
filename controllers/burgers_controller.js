var Burger = require("../models").Burger;
var user = require("../models").user;

module.exports = function(app) {

    //function to verify if is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    };


    app.get("/id", function(req, res) {
        Burger.findAll({
                where: {
                    id: 2
                }
            })
            .then(function(result) {
                var userData = {
                    idData: result
                };
                res.render('indexId', userData);
            });
    });


    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        console.log(req.body);
        Burger.create(req.body).then(function(dbPost) {
            res.redirect("/");
        });
    });

    app.post("/api/posts/facebook", function(req, res) {
        console.log(req.body);
        User.create(req.body).then(function(dbPost) {
            res.redirect("/");
        });
    });

    app.post("/api/posts/:id", function(req, res) {
        var idData = req.params.id;
        Burger.update({
            devoured: true,
        }, {
            where: {
                id: {
                    $eq: idData
                }
            }
        }).then(function(data) {
            res.redirect("/");
        });
    });
};