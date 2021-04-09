var express = require('express');
var router = express.Router();

var connection = require("./my_sql.js")




router.post('/',function(req,res){

    let sql = "INSERT INTO `bnb_users` (`id`, `username`, `passwd`, `id_type_user`, `full_user`, `date_of_birth`, `address`, `avatar`, `resert`, `phone_number`, `created_at`) VALUES (NULL, '"+req.body.username+"', '"+req.body.pass+"', '2', '"+req.body.fullname+"', '"+req.body.date_of_birth+"', '"+req.body.address+"', '"+req.body.avata+"', '0', '"+req.body.phone_number+"','1999-10-10')";
    connection.query(sql, (error, results, fields) => {
   
        if(error)
        console.log(error)

        console.log(results)
        res.json({"data":results})
      }); 
});


module.exports = router;
