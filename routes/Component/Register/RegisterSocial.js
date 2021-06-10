const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailer = require("../../Modul/Mailer");
const jwt = require("jsonwebtoken");
const Register = require("../../../models/Register");
const RegisterAccountForOwn = require("../../../models/RegisterAccountForOwn");
const { request } = require("express");
const Token = require("../../../models/Token");
const User_own = require("../../../models/User_own");
require("dotenv").config();

router.post("/social", async (req, res) => {
  console.log(req.body);
  // var flagCheckEmail = true;
  // console.log(req.query.type);
  if (req.query.type == "user") {
    const checkEmail = await Register.findOne({
      where: {
        email: req.body.email,
      },
    });
 
    console.log(checkEmail)

    if (checkEmail == null) {
      /// dang ky user thuong
      const register = await Register.create({
        username: req.body.username,
        passwd: req.body.passwd,
        id_type_user: 2,
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        email: req.body.email,
        avatar: req.body.avatar,
        resert: 0,
        phone_number: req.body.phone_number,
        become_a_part_of_us: 0,
        created_at: Date.now(),
        description: "",
      });
  
      console.log(register)
      const data = {
        // data tao token
          id:register.id,
          create_at:register.created_at,
          email:register.email,
          avatar:register.avatar,
          full_name:register.full_name,
          phone_number:register.phone_number,
          address:register.address
      };
      const token = jwt.sign(
        //  tao token
        { data: { data } },
        process.env.KEYTOKEN + "_" + req.body.email,
        { algorithm: "HS512", expiresIn: "1h" }
      );

      const resultAddToken = await Token.create({
        // save token cho user thuong moi dang ky
        id_user: register.id,
        token: token,
        create_date: new Date().toISOString().split(".")[0].replace(/T/, " "),
        type: "nguoi dung",
        expiration: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split(".")[0]
          .replace(/T/, " "),
      });

      res.json({
        message: "Register user thuong successfull",
        register: register,
        resultAddToken,
        error: false,
      });
    } else {
      const data = {
        // data tao token
          id:checkEmail.id,
          create_at:checkEmail.created_at,
          email:checkEmail.email,
          avatar:checkEmail.avatar,
          full_name:checkEmail.full_name,
          phone_number:checkEmail.phone_number,
          address:checkEmail.address
      };
      const token = jwt.sign(
        //  tao token
        { data: { data } },
        process.env.KEYTOKEN + "_" + req.body.email,
        { algorithm: "HS512", expiresIn: "1h" }
      );
      res.json({
        token:token,
        message: "Register use thuong fail, please check your email. I sened Token  ",
        error: true,
      });
    }
  }
});

module.exports = router;
