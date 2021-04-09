var express = require('express');
var router = express.Router();

var connection = require("./my_sql.js")




router.get('/',function(req,res){

    let sql = "SELECT bnb_apartment_photo.url_image,bnb_experience_rent_house.title_kinds_of_house,bnb_apartment.apartment_name,bnb_apartment.ratings ,bnb_apartment.price,bnb_apartment_district.name_district from bnb_apartment ,bnb_apartment_photo,bnb_apartment_district,bnb_experience_rent_house where bnb_apartment.id_district = bnb_apartment_district.id and bnb_apartment.id = bnb_apartment_photo.id_partment and bnb_apartment.id_type_house = bnb_experience_rent_house.id and bnb_apartment.id_city = " + req.query.id;
    connection.query(sql, (error, results, fields) => {
    console.log(results)
      res.json({"data":results})
    }); 
});


module.exports = router;
