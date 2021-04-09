const { Sequelize, Model, DataTypes } = require('sequelize');
const City = require('./City');
const sequelize = require('./sequelize');

class Promotion extends Model {}

Promotion.init({
    id_city:DataTypes.NUMBER,
    promotion: DataTypes.NUMBER,
    url_image: DataTypes.STRING,
    expiration_date :DataTypes.DATE
}, { 
    sequelize, 
    modelName: 'Promotion', 
    tableName: 'bnb_promotion',
    timestamps: false
});

// City.hasOne(Promotion,{
//     foreignKey:'id'
// })

// Promotion.belongsTo(City,{
//     as:'city',
//     foreignKey:'id'
// })

module.exports = Promotion