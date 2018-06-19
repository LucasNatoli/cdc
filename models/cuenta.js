'user strict'

module.exports = (sequelize, DataTypes) => {
    const Cuenta = sequelize.define('cuenta', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        dni: {
            type: DataTypes.STRING,
            required: true
        },
        nombre: {
            type: DataTypes.STRING,
            required: true
        },
        celular: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        paranoid: true
    });
    return Cuenta;
};
