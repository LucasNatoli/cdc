var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cdc2'
});

var appRouter = function (app) {

    app.post("/accounts/login", function(req, res) {
        var dni = req.body.dni;
        var password = req.body.password;
        var sql = "SELECT id, nombre, dni FROM cuenta WHERE dni=" + dni + " AND clave ='" + password + "'"

        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error); //TODO: Mejorar el manejo de errores
                res.status(500).end();
                return;
            };
            if (results.length!=1) {
                res.status(401).end();
            } else {
                var sess = req.session;
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

    app.get("/checkpoint", function(req, res) {
        var sess = req.session;
        console.log(sess.nombre);
        res.send("checkpoint");
    });
};

module.exports = appRouter;
