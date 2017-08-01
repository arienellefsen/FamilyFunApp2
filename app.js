// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var session = require('express-session');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
//var db = require("./models/burger.js");
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Static directory
app.use(express.static("public"));

// For Passport

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./config/passport/passport.js')(passport, db.user);

var authRoute = require('./controllers/auth.js')(app, passport);

require('./controllers/burgers_controller.js')(app, passport);

require('./controllers/dashboard_controller.js')(app, passport);

//Facebook strategy

var FACEBOOK_APP_ID = '1380649752032047',
    FACEBOOK_APP_SECRET = '9327a39e77449aeb5d2fe7717480ce5b';
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id']
    },
    function(accessToken, refreshToken, profile, cb) {

        User.create(req.body).then(function(dbPost) {
            res.redirect("/");
        });
    }
));
// Routes
// =============================================================
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});