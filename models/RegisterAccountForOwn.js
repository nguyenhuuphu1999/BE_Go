const { Sequelize, Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('./sequelize');

class RegisterAccountForOwn extends Model {}

RegisterAccountForOwn.init({
    
    username :DataTypes.STRING,
    id_type_user :DataTypes.NUMBER,
    full_name :DataTypes.STRING,
    resert:DataTypes.STRING,
    key_register:DataTypes.STRING,
    phone_number:DataTypes.STRING,
    email:DataTypes.STRING,
    about:DataTypes.STRING,
    language:DataTypes.STRING,
    created_at:DataTypes.DATE,
    status:DataTypes.NUMBER,
    avartar:DataTypes.STRING,
    description:DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'RegisterAccountForOwn',
    tableName: 'bnb_users_own',
    timestamps: false
});


module.exports = RegisterAccountForOwn