const express = require("express");
const jwt = require("jsonwebtoken");
var controller = require("../../Token/Controllers/Auth.controllers");
var router = express.Router();
const User = require("../../models/User");
const Token = require("../../models/Token");
const { Sequelize } = require("../../models/sequelize");
const Op = Sequelize.Op;
const Auth = require("../../Token/Controllers/Auth.controllers.js");
const User_own = require("../../models/User_own");
router.post("/login_user", Auth, async (req, res) => {
  console.log("page login");
  const Datenow = new Date().toISOString().split(".")[0].replace(/T/, " ");
  if (req.query.type == "user") {
    // user thuong login
    if (req.body.email != null || req.body.passwd != null) {
      const result = await User.findOne({
        where: {
          [Op.and]: { email: req.body.email, passwd: req.body.passwd },
        },
      });

      if (result != null) {
        // kien tra user da co tai khoan chua
        const resultToken = Token.findOne({
          /// lay token sau khi co kiem tra user da dang ky
          where: {
            [Op.and]: { id_user: result.id, type: "nguoi dung" },
            //   id_user: result.id,
          },
        });
        resultToken.then((item) => {
          /// kiem tra token da het han chua or chua co token
          console.log("kiem tra token da het han chua");
          if (item != null) {
            if (item.expiration >= Datenow) {
              res.json({
                message: "get token at token",
                data: item,
                data_user:result,
                err: false,
              });
            }
          } else {
            // neu chua co token thi tao token moi choo user
            const data = {
              Fullname: result.full_name,
              email: result.email,
            };
            const token = jwt.sign(
              { data: { data } },
              process.env.KEYTOKEN + "_" + result.email,
              { algorithm: "HS512", expiresIn: "1h" }
            );
            const resultAddToken = Token.create({
              id_user: result.id,
              token: token,
              create_date: new Date()
                .toISOString()
                .split(".")[0]
                .replace(/T/, " "),
              type: "nguoi dung",
              expiration: new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000
              )
                .toISOString()
                .split(".")[0]
                .replace(/T/, " "),
            });

            res.json({
              message: "create token user",
              Data: result,
              access_token: token,
              err: false,
            });
          }
        });
      } else {
        // Tao token nếu check tai khoan chua co token
        res.json({
          message: "Tai khoan user thuong nay chua duoc dang ky",
          err: true,
        });
      }
    } else {
      res.json({
        message: " ban dang dang nhap user thuong .token ban da het han",
        err: true,
      });
    }
  } else {
    // chu cho thue login
    if (req.body.email != null || req.body.passwd != null) {
        console.log(req.body)
      if (req.query.type == "own") {
        // user own login
        const result = await User_own.findOne({
          where: {
            [Op.and]: { email: req.body.email, passwd: req.body.passwd },
          },
        });
        console.log(result);
        if (result != null) {
          // kien tra user da co tai khoan chua
          const resultToken = Token.findOne({
            /// lay token sau khi co kiem tra user da dang ky
            where: {
              [Op.and]: { id_user: result.id, type: "chu nha" },
              //   id_user: result.id,
            },
          });
          resultToken.then((item) => {
            /// kiem tra token da het han chua or chua co token
            console.log("kiem tra token da het han chua");
            if (item != null) {
              if (item.expiration >= Datenow) {
                res.json({
                  message: "get token at token",
                  data: item,
                  err: false,
                });
              }
            } else {
              // neu chua co token thi tao token moi choo user
              const data = {
                Fullname: result.full_name,
                email: result.email,
              };
              const token = jwt.sign(
                { data: { data } },
                process.env.KEYTOKEN + "_" + result.email,
                { algorithm: "HS512", expiresIn: "1h" }
              );
              const resultAddToken = Token.create({
                id_user: result.id,
                token: token,
                create_date: new Date()
                  .toISOString()
                  .split(".")[0]
                  .replace(/T/, " "),
                type: "chu nha",
                expiration: new Date(
                  new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                )
                  .toISOString()
                  .split(".")[0]
                  .replace(/T/, " "),
              });

              res.json({
                message: "create token user",
                Data: result,
                access_token: token,
                err: false,
              });
            }
          });
        } else {
          // Tao token nếu check tai khoan chua co token
          res.json({
            message: "Tai khoan chu nha nay chua duoc dang ky",
            err: true,
          });
        }
      }
    } else {
      res.json({
        message: " ban dang dang nhap user chu nha .token ban da het han",
        err: true,
      });
    }
  }
});

module.exports = router;
