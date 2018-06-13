var express = require("express");
var session = require('express-session')
var routes = require("./routes/routes.js");
var bodyParser = require('body-parser');

var sess = {
    secret: 'shhhh',
    resave: false,
    saveUninitialized: true,
    cookie: {}
};
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pwa/web'));
app.use(session(sess))
routes(app);

var server = app.listen(3000, function () {
    console.log("server running on port.", server.address().port);
});
