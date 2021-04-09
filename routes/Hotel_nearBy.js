var express = require('express');
var router = express.Router();
// var mysql = require('mysql');

var cons = require("./my_sql.js")

router.get('/',function(req,res){
    let sql = "SELECT bnb_experience_rent_house.title_kinds_of_house,bnb_apartment_photo.url_image,bnb_apartment.apartment_name,bnb_apartment.ratings,bnb_apartment.price FROM `bnb_apartment`,bnb_experience_rent_house,bnb_apartment_photo where bnb_experience_rent_house.id = bnb_apartment.id_type_house and id_type_house = 5 and bnb_apartment.id = bnb_apartment_photo.id_partment ORDER BY bnb_apartment.id asc LIMIT 8";
    cons.query(sql, (error, results, fields) => {
    console.log(results)
      res.json({"data":results})
    }); 
});
module.exports = router;



