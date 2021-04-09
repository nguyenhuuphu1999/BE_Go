var express = require('express');
var router = express.Router();

var connection = require("./my_sql.js")




router.get('/',function(req,res){

    let sql = "SELECT url_image,apartment_name,ratings,price,name_city FROM `bnb_apartment` ,bnb_apartment_photo,bnb_city WHERE bnb_apartment.id = bnb_apartment_photo.id_partment and bnb_apartment.id_city = bnb_city.id  LIMIT 8";
    connection.query(sql, (error, results, fields) => {
    console.log(results)
      res.json({"data":results})
    }); 
});


module.exports = router;
