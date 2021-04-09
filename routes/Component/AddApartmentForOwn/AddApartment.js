const express = require("express");
const router = express.Router();

const Apartment = require("../../../models/Apartment");
const { sync } = require("../../../models/sequelize");
const Comment = require("../../../models/ApartmentComment");
const Maps = require("../../../models/ApartmentMaps");
const ApartmentPhoto = require("../../../models/ApartmentPhoto");
const ApartmentPhotos = require("../../../models/ApartmentPhotos");
const ApartmentDetail = require("../../../models/ApartmentDetail");
const ApartmentCheckBookings = require("../../../models/ApartmentCheckBookings");
const TypeHouse = require("../../../models/TypeHouse");
const City = require("../../../models/City");
const User = require("../../../models/User");
const { Op } = require("sequelize");
const { isHttpError } = require("http-errors");
const ApartmentComment = require("../../../models/ApartmentComment");
router.get("/", async (req, res) => {
  const resultApartment = await Apartment.findAll({
    include: [
      {
        model: TypeHouse,
        as: "typeHouse",
        attributes: ["title"],
      },
      {
        model: City,
        as: "City",
        attributes: ["name_city"],
      },
      {
        model: User,
        as: "User",
        attributes: ["full_name"],
      },
    ],
  });

  res.json({
    message: "Get data sucessfully",
    data: resultApartment,
    err: false,
  });
});

router.get("/:id", async (req, res) => {
  console.log(req.query.limit);
  if (req.query.limit == "2") {
    const result = await Apartment.findAll({
      where: {
        id_user_own: req.params.id,
      },
      include: {
          model: ApartmentPhotos,
          as: 'apartment_images',
          attributes:['url_image']
       
          
      },
      limit: 2,
      order: [["id", "DESC"]],
    });
    res.json({
      data: result,
      message: "get apartment successfully",
    });
  }else if(req.query.limit == "all"){
    console.log("limit all")
    const result = await Apartment.findAll({
      where: {
        id_user_own: req.params.id,
      },
      include:[ {
         
          model: ApartmentPhotos,
          as: 'apartment_images',
          attributes:['url_image'],
      },{
        model:TypeHouse,
        as:'typeHouse',
        attributes:['title'],

      }],order: [["id", "DESC"]],
    });

  
    
    res.json({
      data: result,
      message: "get apartment successfully",
    });
    }
   
   else {
    const result = await Apartment.findAll({
      where: {
        id_user_own: req.params.id,
      },
      include: {
        model: ApartmentPhotos,
        as: 'apartment_images',
        attributes:['url_image']
    },
        order: [["id", "DESC"]],
    });
    var page = req.query.page | 1;
    var perpage = 8;
    var start = (page - 1) * perpage;
    var end = page * perpage;

    console.log(result.length);

    res.json({
      datalength: Math.ceil(result.length / 8),
      data: result.slice(start, end),
      message: "get apartment successfully",
    });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const addPartment = await Apartment.create({
    id_city: req.body.id_city,
    id_district: req.body.id_district,
    id_type_house: req.body.id_type_house,
    provincial: req.body.provincial,
    apartment_name: req.body.apartment_name,
    price: req.body.price,
    ratings: req.body.ratings,
    image_url: req.body.image_url,
    id_user_own: req.body.id_user_own,
    id_number_rooms: req.body.id_number_rooms,
  });
  console.log(addPartment)
  res.json({
    message: "Tao phong thanh cong",
    data: addPartment,
  });
});

router.put("/:id", async (req, res) => {
  console.log("data send" + req.body)
  const fintAapartment = await Apartment.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log(fintAapartment);
  if (fintAapartment != null) {
    const update = await Apartment.update(
      {
        id_city: req.body.id_city,
        id_district: req.body.id_district,
        id_type_house: req.body.id_type_house,
        apartment_name: req.body.apartment_name,
        price: req.body.price,
        ratings: req.body.ratings,
        image_url: req.body.image_url,
        id_user_own: req.body.id_user_own,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({
      message: "Update thanh cong",
      data: update,
      err: false,
    });
  } else {
    res.json({
      message: "Phong ban khong ton tai",

      err: true,
    });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);

  const resultComment = await Comment.destroy({
    where: {
      id_apartment: req.params.id,
    },
  });
  const resultMaps = await Maps.destroy({
    where: {
      id_apartment: req.params.id,
    },
  });

  const resultphoto = await ApartmentPhoto.destroy({
    where: {
      id_partment: req.params.id,
    },
  });

  const resultphotos = await ApartmentPhotos.destroy({
    where: {
      id_partment: req.params.id,
    },
  });

  const resutlApartmentDetail = await ApartmentDetail.destroy({
    where: {
      id_apartment: req.params.id,
    },
  });

  const resutlApartcheckBookings = await ApartmentCheckBookings.destroy({
    where: {
      id_apartment: req.params.id,
    },
  });

  const resutlApartment = await Apartment.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    data: resultMaps,
  });
});

module.exports = router;
