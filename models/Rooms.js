const { Types } = require('mysql');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Apartment extends Model {}

Apartment.init({
    
   id:{
       primaryKey:true,
       type:DataTypes.NUMBER
   },
   room_details:DataTypes.STRING
    
}, { 
    sequelize, 
    modelName: 'Apartment_rooms',
    tableName: 'bnb_apartment_rooms',
    timestamps: false
});


module.exports = Apartment