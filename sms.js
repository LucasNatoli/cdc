var mysql = require('mysql');
var request = require('request');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var targetConn = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.username,
    password : config.database.password,
    database : config.database.name
});

var sql = `
    SELECT  *
    FROM    cuenta
    WHERE   estado=0`;
var pin = Math.round(Math.random() * (98765 - 12345) + 12345);
var mensajeSms = 'Central%20de%20Conbrazas:%20Su%20codigo%20de%20verificacion%20es:%20' + pin;
//var url = 'http://www.nobilecomputacion.com.ar/smswww/listaentrante.php?apodo=xxxxxxxxxxxdesde=01/01/2018%2000:01&hasta=21/03/2018%2019:00';
//var url = 'http://www.nobilecomputacion.com.ar/smswww/ressmsxid.php?apodo=xxxxxx&identificador=CDC1';

targetConn.query(sql, function (err, results, fields) {
    if (err) throw err;
    for (var i=0; i<results.length; i++){
        var cuentaId = results[i].id;
        var celular = results[i].celular;
        var url = 'http://www.nobilecomputacion.com.ar/smswww/cargaremota.php?numero=' + celular + '&apodo=' + config.sms.apodo + '&mensaje=' + mensajeSms + '&idsms=CDC' + celular;
        console.log('enviando mensaje a ' + celular);
        console.log(url);

        request(url, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body);
            sqlInserSms = 'INSERT INTO sms (celular, pin) VALUES (' + celular + ', ' + pin + ')';
            targetConn.query(sqlInserSms, [], function(err, results) {
                if (err) console.log(err);
                console.log(results);
                //TODO: Update estado de la cuenta!!
// TODO: Resultado del sql para mejora de manejo de ejecucion
  //OkPacket {
  // fieldCount: 0,
  // affectedRows: 1,
  // insertId: 1,
  // serverStatus: 2,
  // warningCount: 0,
  // message: '',
  // protocol41: true,
  // changedRows: 0 }
  //

            });
        });

    };
});

//http://www.nobilecomputacion.com.ar/smswww/listaentrante.php?apodo=factora2379&desde=01/01/2018%2000:01&hasta=21/03/2014%2011:59
//http://www.nobilecomputacion.com.ar/smswww/cargaremota.php?numero=15380313333&mensaje=probando&apodo=factora2379
