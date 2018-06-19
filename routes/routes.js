var mysql      = require('mysql');
var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

var connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.username,
    password : config.database.password,
    database : config.database.name
});

var appRouter = function (app) {

    app.post("/accounts/login", function(req, res) {
        var dni = req.body.dni;
        var password = req.body.password;
        var sql = "SELECT id, nombre, dni FROM cuenta WHERE dni=" + dni + " AND clave ='" + password + "'"
        var sess = req.session;

        connection.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err); //TODO: Mejorar el manejo de errores
                res.status(500).end();
                return;
            };
            if (results.length!=1) {
                res.status(401).end();
            } else {
                sess.id = results[0].id;
                sess.nombre = results[0].nombre;
                sess.dni = results[0].dni;
                var resData = {
                    nombre: sess.nombre,
                    dni: sess.dni
                }
                res.status(200).send(resData);
            };
        });
    });

    app.post("/accounts/register", function (req, res) {
        var dni = req.body.dni;
        var nombre = req.body.nombre;
        var celular = req.body.celular;
        var email = req.body.email;
        var password = req.body.password;
        var sql = "INSERT INTO cuenta (dni, nombre, celular, email, clave, estado) VALUES (" + dni + ",'" + nombre + "','" + celular + "','" + email + "','" + password + "', 0)";
        connection.query(sql, function(err, result){
            if (err) {
                console.log(err); //TODO: Mejorar el manejo de errores
                res.status(500).end();
                return;
            };
            res.status(200).send('ok');
        });
    });

    app.get("/checkpoint", function(req, res) {
        var sess = req.session;
        console.log(sess.nombre);
        res.send("checkpoint");
    });
};

module.exports = appRouter;
