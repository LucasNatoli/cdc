var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cdc2'
});

var appRouter = function (app) {
  app.post("/accounts/verificar", function(req, res) {

      var dni = req.body.dni;
      var password = req.body.password;

      // connection.connect();
      var sql = "SELECT COUNT(*) count FROM cuenta WHERE dni=" + dni + " AND clave ='" + password + "'"
      console.log(sql);
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send(sql);    
      });

      // connection.end();

      console.log(dni, password);
  });
}

module.exports = appRouter;
