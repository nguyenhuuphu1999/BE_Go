const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class ApartmentMaps extends Model {}
ApartmentMaps.init({
    id_apartment:DataTypes.NUMBER,
    map_url:DataTypes.STRING
},{
    sequelize,
    modelName:'ApartmentMaps',
    tableName:'bnb_apartment_map'
})

module.exports  = ApartmentMaps
