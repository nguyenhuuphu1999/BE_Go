const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const nodemailer = require("nodemailer");
const RegisterAccountForOwn = require('../../../models/RegisterAccountForOwn');
const mailer =require('../../Modul/Mailer');

router.post('/andRegisterOwn', async (req,res) => {
    console.log(req.body)
  var flagCheckEmail = true;
  const random =  Math.floor(Math.random() * 1000000);

  const checkEmail = await RegisterAccountForOwn.findOne({
      where:{
          email:req.body.email
      }
  })

       if(req.body.email == ' ' || req.body.full_user == '' || req.body.phone_number == ' ')
       {
        res.json({
            err:true
        })
       }else{
        if(checkEmail == null)
        {

            const email= req.body.email;
            const title = "Ma Xac Nhan";
            const content = '<h1 style="color: red">Welcome you to Go</h1><p> </p>Your confirmation code is: '+random+'</p> <div> <i>Please enter the above confirmation code to login to your account !</i> </div>';
        
            const transporter = mailer.transporter();
            const mailOptions = mailer.mailOptions(email,title,content)
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json({
                        error
                    })
                }
        
            });

            var ResgisterOwn = await RegisterAccountForOwn.create({

                username :req.body.username,
                id_type_user :4,
                full_user :req.body.full_user,
                avatar :null,
                resert:0,
                key_register:random,
                phone_number:req.body.phone_number,
                email:req.body.email,
                created_at:Date.now(),
                status:0 ,
                language:"",
                about:"",
                avartar:"",
                description:''
            })
            res.json({
                message:"Register successfull",
                data:ResgisterOwn,
                err:false
            })
        }else{
            res.json({
            message:"Email này đã được đăng ký",
            err:true

            })
    }
    }
       

}); 


module.exports = router;
