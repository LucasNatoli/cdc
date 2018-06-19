'user strict'

module.exports = (sequelize, DataTypes) => {
    const SmsVerificacion = sequelize.define('cuenta', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        celular: {
            type: DataTypes.STRING(50),
            required: true
        },
        pin: {
            type: DataTypes.STRING(10),
            required: true
        }
    }, {
        paranoid: true
    });
    return SmsVerificacion;
};
