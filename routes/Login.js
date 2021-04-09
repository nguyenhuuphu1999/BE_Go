var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var connection = require("./my_sql.js")





router.post('/',verifyToken,function(req,res){

    let sql = "SELECT username,passwd FROM `bnb_users` WHERE username ='"+req.body.username+"' and passwd ='"+req.body.pass+"'";
    connection.query(sql, (error, results, fields) => {
    console.log(req.body)
      
      if(typeof results != "undefined" && results != "null"){
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh',{expiresIn:60*60});
        
        res.json({'data':token})
      }else{
        res.json({"data":"Dang nhap khong thanh cong"});
      }
    }); 

   
  });

function verifyToken(req,res,next){

  // console.log(req.header('Authorization'))
  var authorization = req.header('Authorization');
  console.log(authorization);
  var array_auth =authorization.split('.');
  console.log(array_auth)
  // if(typeof bearerHeader !== 'undefined'){

  // }else{
  //   res.sendStatus(403);
  // }
}

module.exports = router;
