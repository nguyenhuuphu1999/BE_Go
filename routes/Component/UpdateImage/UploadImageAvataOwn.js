const express = require("express");
const router = express.Router();
var cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const MethodUploadFile = require("../../Component/UpdateImage/MethodUploadFile.js");

const ApartmentPhotos = require("../../../models/ApartmentPhotos");

router.post(
  "/avatar",
  async (req, res, next) => {
    console.log(req.body)
    const temp = req.body.data.data;
    console.log(req.body.data.id_apartment);
    const uploadResponse = await cloudinary.uploader.upload(temp, {
      upload_preset: "dev_setups",
    });
    console.log(uploadResponse.url);

    const result = await ApartmentPhotos.create({
      id_partment: req.body.data.id_apartment,
      url_image: uploadResponse.url,
    });

    if (result != null) {
      res.json({
        message: "upload succefull",
        data: result,
      });
    } else {
      res.status(500).json({
        message: "upload image fail.",
      });
    }
  }
);

router.put("/avatar", async (req, res) => {
  console.log("body" + req.body.data.id);
  const temp = req.body.data.data;
  const uploadResponse = await cloudinary.uploader.upload(temp, {
    upload_preset: "dev_setups",
  });
  console.log(uploadResponse.url);

  const result = await ApartmentPhotos.update(
    {
      url_image: uploadResponse.url,
    },
    {
      where: {
        id: req.body.data.id,
      },
    }
  );

  if (result != null) {
    res.json({
      message: "upload succefull",
      data: result,
    });
  } else {
    res.status(500).json({
      message: "upload image fail.",
    });
  }
});

module.exports = router;
