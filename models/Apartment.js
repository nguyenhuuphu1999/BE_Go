const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TypeHouse = require('./TypeHouse')
const City = require('./City')
const User = require('./User')
class Apartment extends Model {}

Apartment.init({
    
    id_city:DataTypes.STRING,
    id_district:DataTypes.STRING,
    id_type_house:DataTypes.STRING,
    apartment_name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    ratings :DataTypes.NUMBER,
    image_url:DataTypes.STRING,// image_url: Sequelize.VIRTUAL
    id_user_own:DataTypes.STRING,
    note_apartment:DataTypes.STRING,
    provincial:DataTypes.STRING,
    image: Sequelize.VIRTUAL
}, { 
    sequelize, 
    modelName: 'Apartment',
    tableName: 'bnb_apartment',
    timestamps: false
});

TypeHouse.hasMany(Apartment,{
    foreignKey:'id_type_house'
})

Apartment.belongsTo(TypeHouse,{
    as:'typeHouse',
    foreignKey:'id_type_house'
})

City.hasMany(Apartment,{
    foreignKey:'id'
})

Apartment.belongsTo(City,{
    as:'City',
    foreignKey:'id_city'
})

User.hasMany(Apartment,{
    foreignKey:'id'
})

Apartment.belongsTo(User,{
    as:'User',
    foreignKey:'id_user_own'
})

module.exports = Apartment