const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const TypeHouse = require("../../models/TypeHouse");
const Apartment = require("../../models/Apartment");
const DiaDiemNoiBat = require("../../models/DiaDiemNoiBat");
const Comment = require("../../models/ApartmentComment");
const User = require("../../models/User");
const ApartmentPhotos = require("../../models/ApartmentPhotos");
const City = require("../../models/City");

router.get("/", async (req, res) => {
  const typeHouse = await TypeHouse.findAll({});

  const apartment = await Apartment.findAll({
    where: { id_city: 1 },
    limit: 8,
    include: {
      model: ApartmentPhotos,
      as: "apartment_images",
      attributes: ["url_image"],
    },
    order: [["id", "DESC"]],
  });
  const diaDiemNoiBat = await DiaDiemNoiBat.findAll({});

  const comment = await Comment.findAll({
    limit: 3,
    where: {
      rattings: {
        [Op.gte]: 5,
      },
    },
  });

  res.json({
    data: {
      typeHouse,
      apartment,
      diaDiemNoiBat,
      comment,
      // ,comments
    },
  });
});

router.post("/search", async (req, res) => {
  console.log(req.body)
  const result = await City.findAll({
    where: [
      {
        name_city: {
          [Op.like]: "%" + req.body.name_city + "%",
        },
      },
   
    ],
  });
  // console.log(result.leen)
  if (result.length > 0) {
    res.status(200).json({
      message: "get data thanh cong",
      data: result,
      err: false,
    });
  } else {
    res.status(204).json({
      message: "get data thanh cong",
      data: result,
      err: false,
    });
  }
});

module.exports = router;
