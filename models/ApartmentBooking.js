const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User =require('./User');

class ApartmentBooking extends Model {}

ApartmentBooking.init({
    
    id_apartment:DataTypes.STRING,
    id_user_booking:DataTypes.NUMBER,
    check_in:DataTypes.DATE,
    check_out:DataTypes.DATE,
    ho_ten:DataTypes.STRING,
    email:DataTypes.STRING,
    so_dien_thoai:DataTypes.STRING,
    phi_dich_vu:DataTypes.NUMBER,
    total:DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'ApartmentBooking',
    tableName: 'bnb_apartment_bookings',
    timestamps: false
});




module.exports = ApartmentBooking