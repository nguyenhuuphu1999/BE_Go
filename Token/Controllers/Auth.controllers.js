const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const Token = require("../../models/Token");
const User = require("../../models/User");
const User_own = require("../../models/User_own");
const router = express.Router();

router.use(function async(req, res, next) {
  console.log(req.query);
  console.log(req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    var key_id_user = "";
    var key_token = req.headers.authorization.split(" ")[1];
    const resultToken = Token.findOne({ // kiem tra token do da ton tai chua 
      where: {
        token: key_token,
      },
    });
    resultToken.then((result) => {
      console.log(result);
      const Datenow = new Date().toISOString().split(".")[0].replace(/T/, " ");
      console.log(Datenow);
      if (result != null) {
        if(result.type == 'nguoi dung'){ /// kiem tra user login la nguoi dung
            if (result.expiration >= Datenow) {
                const result_info_user = User.findOne({
                  where: {
                    id: result.id_user,
                    
                  },
                });
                result_info_user.then((result) => {
                  res.json({
                    message: "get token user thuong",
                    data: result,
                    err: false,
                  });
                });
              } else {
                result_info_user = Token.destroy({
                  where: {
                    id: result.id,
                  },
                });
                next();
              }
        }
        else{ // kt user login la chu nha
            if (result.type == 'chu nha') {
                const result_info_user = User_own.findOne({
                  where: {
                    id: result.id_user,
                    
                  },
                });
                result_info_user.then((result) => {
                  res.json({
                    message: "get token user chu nha",
                    data: result,
                    err: false,
                  });
                });
              } else {
                result_info_user = Token.destroy({
                  where: {
                    id: result.id,
                  },
                });
                next();
              }//end  kt user login la chu nha
        }
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

module.exports = router;
