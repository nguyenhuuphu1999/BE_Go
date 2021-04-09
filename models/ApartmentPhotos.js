const { Sequelize, Model, DataTypes } = require("sequelize");
const Apartment = require("./Apartment");
const sequelize = require("./sequelize");

class ApartmentPhotos extends Model {}

ApartmentPhotos.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    id_partment: DataTypes.NUMBER,
    url_image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "ApartmentPhotos",
    tableName: "bnb_apartment_photo_detail",
    timestamps: false,
  }
);

ApartmentPhotos.belongsTo(Apartment, { foreignKey: "id_partment" });

Apartment.hasMany(ApartmentPhotos, {
  as: "apartment_images",
  foreignKey: "id_partment",
});

module.exports = ApartmentPhotos;
