const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Register extends Model {}

Register.init({
    
    username:DataTypes.STRING,
    passwd:DataTypes.STRING,
    id_type_user:DataTypes.NUMBER,
    full_name:DataTypes.STRING,
    date_of_birth:DataTypes.DATE,
    address:DataTypes.STRING,
    email:DataTypes.STRING,
    avatar:DataTypes.STRING,
    resert:DataTypes.STRING,
    phone_number:DataTypes.STRING,
    become_a_part_of_us:DataTypes.NUMBER,
    created_at:DataTypes.DATE,
    description:DataTypes.STRING
  
}, { 
    sequelize, 
    modelName: 'Register',
    tableName: 'bnb_users',
    timestamps: false
});


module.exports = Register