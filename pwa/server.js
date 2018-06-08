var express = require("express");
var app = express();

app.use(express.static('web'));

var server = app.listen(3000, function () {
    console.log("server running on port.", server.address().port);
});
