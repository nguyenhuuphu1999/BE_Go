const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class ApartmentDetail extends Model {}

ApartmentDetail.init({
  id_apartment: DataTypes.NUMBER,
  toan_bo_nha: DataTypes.TEXT,
  ve_sinh_tang_cuong: DataTypes.TEXT,
  tu_nhan_phong:DataTypes.TEXT,
  chinh_sach_huy:DataTypes.TEXT,
  noi_quy_nha:DataTypes.TEXT
}, { 
    sequelize, 
    modelName: 'ApartmentDetail', 
    tableName: 'bnb_apartment_details',
    timestamps: false
});

module.exports = ApartmentDetail