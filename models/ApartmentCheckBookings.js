const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class ApartmentCheckBookings extends Model {}

ApartmentCheckBookings.init({
    
    id_apartment:DataTypes.STRING,
    check_in:DataTypes.DATE,
    check_out: DataTypes.DATEONLY,
    id_user_booking:DataTypes.NUMBER
   
}, { 
    sequelize, 
    modelName: 'ApartmentCheckBookings',
    tableName: 'bnb_apartment_bookings',
    timestamps: false
});


module.exports = ApartmentCheckBookings