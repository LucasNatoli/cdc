'use strict'

var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        define: {
            underscored: true
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.owners = require('cuenta.js')(sequelize, Sequelize);
db.owners = require('smsVerificacion.js')(sequelize, Sequelize);

//Relations
// db.pets.belongsTo(db.owners);
// db.owners.hasMany(db.pets);

module.exports = db;
