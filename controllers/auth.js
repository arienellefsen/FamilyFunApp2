var authController = require('../controllers/authcontroller.js');
var user = require("../models").user;

module.exports = function(app, passport) {

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    //console.log(passport);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    app.get('/auth/facebook/callback', authController.facebookCallBack);

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));
}