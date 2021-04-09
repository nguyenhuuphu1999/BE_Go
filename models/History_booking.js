const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const User = require("./User");

class History_booking extends Model {}

History_booking.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_own:DataTypes.NUMBER,
    id_apartment:DataTypes.NUMBER,
    id_user: DataTypes.NUMBER,
    name_apartment: DataTypes.STRING,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    so_ngay:DataTypes.NUMBER,
    so_tien:DataTypes.NUMBER,
    tong_tien:DataTypes.NUMBER,
    image:DataTypes.STRING,
    ma_hoa_don:DataTypes.STRING
  },
  {
    sequelize,
    modelName: "lich_su_booking",
    tableName: "bnb_history_booking",
    timestamps: false,
  }
);



module.exports = History_booking;
