var express = require("express");
var app = express();

app.use(express.static('web'));

<<<<<<< HEAD
var server = app.listen(3000, function () {
=======
var server = app.listen(8080, function () {
>>>>>>> 06ca1d12173267c1c0d0acb91de1540c54916519
    console.log("server running on port.", server.address().port);
});
