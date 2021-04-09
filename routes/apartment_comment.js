var express = require('express');
var router = express.Router();
const ApartmentComment = require('../models/ApartmentComment');
const User  = require('../models/User');

var connection = require("./my_sql.js")

// User.hasMany(ApartmentComment);


router.get('/detail/comment', async function(req,res, next){

    // let sql = "SELECT bl.id,bl.comment,bl.rattings,bnb_users.address FROM bnb_apartment_comment bl,bnb_users WHERE bnb_users.id = bl.id_user and id_apartment= "+req.query.id+" and rattings > 3 LIMIT 3";

    // connection.query(sql, (error, results, fields) => {
    // console.log(results)
    //   res.json({"data":results})
    // }); 

    
    try {
      const comments = await ApartmentComment.findAll({
        where: { 
          id_apartment: req.query.id ,
          
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['address']
        }]
      });
    
     
      res.json({ data: comments });
    } catch (e) {
      console.error(e);
      next(e)
    }   
});


module.exports = router;
