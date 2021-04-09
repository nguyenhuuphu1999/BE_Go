const {Sequelize, Model, DataTypes,} = require('sequelize');
const { models } = require('./sequelize');
const sequelize  =require('./sequelize')

class Token extends Model{}

Token.init({
    id:{
        type:DataTypes.NUMBER,
        primaryKey:true
    },
    id_user:DataTypes.NUMBER,
    token:DataTypes.STRING,
    expiration:DataTypes.STRING,
    type:DataTypes.STRING,
    create_date:DataTypes.DATE
},{
    sequelize,
    modelName:'Token',
    tableName:'bnb_user_token',
    timestamps:false
})

module.exports=Token
