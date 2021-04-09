const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const ApartmentComment = require('./ApartmentComment');
const History_booking = require('./History_booking');
class User extends Model {}

User.init({
  full_name:DataTypes.STRING,
  email:DataTypes.STRING,
  phone_number:DataTypes.STRING,
  address: DataTypes.STRING,
  description:DataTypes.STRING,
  created_at:DataTypes.DATE	,
  avatar:DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'User', 
    tableName: 'bnb_users',
    timestamps: false
});
User.hasMany(ApartmentComment, {
  foreignKey: 'id_user'
});

ApartmentComment.belongsTo(User, {
  as: 'user',
  foreignKey: 'id_user'
});



User.hasMany(History_booking,{
  foreignKey:'id_user',
  as:'info'
})

History_booking.belongsTo( User,{
  as:'info',
  foreignKey:'id_user'
})
module.exports = User


// User.hasMany(Apartment)