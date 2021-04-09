const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class DiaDiemNoiBat extends Model {}

DiaDiemNoiBat.init({
    id:{
        type:DataTypes.NUMBER,
        primaryKey:true
    },
    name_city: DataTypes.STRING,
    image_url :DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'DiaDiemNoiBat',
    tableName: 'bnb_city',
    timestamps: false
});

module.exports = DiaDiemNoiBat