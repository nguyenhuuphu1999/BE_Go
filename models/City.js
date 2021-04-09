const { Sequelize,Model,DataTypes} = require('sequelize');
const Promotion = require('./Promotion');
const sequelize = require('./sequelize');

class City extends Model{}


City.init({

    id:{
        primaryKey:true,
       type:DataTypes.NUMBER
    },
    id_country:DataTypes.NUMBER,
    name_city:DataTypes.STRING,
    image_url:DataTypes.STRING,
    description:DataTypes.STRING
},{
    sequelize,
    modelName:'City',
    tableName:'bnb_city',
    timestamps:false

});
City.hasOne(Promotion,{
    foreignKey:'id_city'
})

Promotion.belongsTo(City,{
    as:'city',
    foreignKey:'id_city'
})

module.exports = City;