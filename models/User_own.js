const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const ApartmentComment = require('./ApartmentComment');
class User_own extends Model {}

User_own.init({
  username:DataTypes.STRING,
  id_type_user:DataTypes.NUMBER,
  full_name:DataTypes.STRING,
  passwd: DataTypes.STRING,
  phone_number:DataTypes.STRING,
  email:DataTypes.STRING	,
  about:DataTypes.STRING,
  created_at:DataTypes.DATE,
  avartar:DataTypes.STRING,
  status:DataTypes.NUMBER
}, { 
    sequelize, 
    modelName: 'User_own', 
    tableName: 'bnb_users_own',
    timestamps: false
});
// User_own.hasMany(ApartmentComment, {
//   foreignKey: 'id_user'
// });

// ApartmentComment.belongsTo(User_own, {
//   as: 'user',
//   foreignKey: 'id_user'
// });
module.exports = User_own


// User.hasMany(Apartment)