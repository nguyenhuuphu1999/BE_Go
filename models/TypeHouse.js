const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class TypeHouse extends Model {}

TypeHouse.init({
    id:{
       type: DataTypes.NUMBER,
       primaryKey:true
    },
    image_url: DataTypes.STRING,
    title :DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'TypeHouse',
    tableName: 'bnb_type_house',
    timestamps: false
});

// TypeHouse.hasOne()
// User.hasMany(ApartmentComment, {
//     foreignKey: 'id_user'
//   });
// TypeHouse.primaryKeyAttribute(id.true)
  
module.exports = TypeHouse