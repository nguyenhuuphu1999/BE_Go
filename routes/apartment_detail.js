var express = require('express');
var router = express.Router();

var connection = require("./my_sql.js")

const Apartment = require('../models/Apartment');
const ApartmentComment = require('../models/ApartmentComment');
const ApartmentDetail = require('../models/ApartmentDetail');
const Users = require('../models/User');
router.get('/detail', async function(req, res) {

  const apartment = await Apartment.findOne({
    where: { id: req.query.id }
  });
  //abc



  const service = await ApartmentDetail.findOne({
    where: {id_apartment:req.query.id}
    
  })

  // const comments = await ApartmentComment.findAll({
  //   where: { id_apartment: req.query.id },
  //   limit:3
  // });

  res.json({ 
    data: {
      ...apartment.dataValues,service
      // ,comments
    } 
  });

  // res.json({data:apartment});

    // let sql = "SELECT nha.id  ,apartment_name , nha.price , nha.ratings FROM bnb_apartment_comment bl ,bnb_apartment nha , bnb_apartment_convenient service ,bnb_type_house where nha.id = "+req.query.id+" GROUP by nha.apartment_name,nha.ratings,nha.price";

    // connection.query(sql, (error, results, fields) => {
    // console.log(results)
    //   res.json({"data":results})
    // }); 
});


module.exports = router;
