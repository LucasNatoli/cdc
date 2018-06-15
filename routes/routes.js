var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kalama2018',
  database : 'cdc'
});

var appRouter = function (app) {

    app.post("/accounts/login", function(req, res) {
        var dni = req.body.dni;
        var password = req.body.password;
        var sql = "SELECT id, nombre, dni FROM cuenta WHERE dni=" + dni + " AND clave ='" + password + "'"
        var sess = req.session;

        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error); //TODO: Mejorar el manejo de errores
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
        var email = req.body.email;
        var password = req.body.password;
        var celular = req.body.celular;
    });

    app.get("/checkpoint", function(req, res) {
        var sess = req.session;
        console.log(sess.nombre);
        res.send("checkpoint");
    });
};

module.exports = appRouter;
