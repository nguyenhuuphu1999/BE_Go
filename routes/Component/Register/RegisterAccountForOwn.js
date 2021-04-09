const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const RegisterAccount = require('../../../models/RegisterAccountForOwn');

router.post('/userOwn', async (req,res) => {

    const user = await RegisterAccount.create({
        id :req.body.id,
        username :req.body.username,
        id_type_user :req.body.id_type_user,
        full_user :req.body.full_user,
        date_of_birth :req.body.date_of_birth,
        id_city :req.body.id_city,
        avatar :null,
        resert:0,
        register:"2111116",
        phone_number:req.body.phone_number,
        created_at:Date.now()
        
    })
   
  res.json({
    message:"Ban da dang ky chu nha thanh cong" ,
    data:user
  });

}); 


module.exports = router;
