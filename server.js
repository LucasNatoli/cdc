var express = require("express");
var app = express();
var routes = require("./routes/routes.js");

app.use(express.static('pwa/web'));
routes(app);

var server = app.listen(3000, function () {
    console.log("server running on port.", server.address().port);
});
