const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const ComfimRegister = require('../../models/Register');
const { findOne } = require('../../models/RegisterAccountForOwn');
const RegisterAccountForOwn = require('../../models/RegisterAccountForOwn');
router.post('/user', async (req,res) => {

    console.log(req.body)   
    var flagCheckKeyRegister = true;
    const checkCode = await RegisterAccountForOwn.findOne({
        where:{
            key_register:req.body.code,
            email:req.body.email
        }
    })
    console.log(checkCode)
    if(checkCode == null){
        console.log(" ngao he")
        flagCheckKeyRegister = true
    }else{
        flagCheckKeyRegister= false
    }
   


  if( flagCheckKeyRegister == false){
    const ComfimPageUser = await ComfimRegister.update({
        become_a_part_of_us:1,
        id_type_user:4,
    },{
       where:{
        email:req.body.email
       }
    }
    )

    const UpdateKeyRegidterInOwn = await RegisterAccountForOwn.update(
        {
            key_register:'',
            status:1

        },
            {
                where:{
                    email:req.body.email
                }
            }
    )
    res.json({
        message:"Update Successfull",
        err:false
    })
  }else{
    res.json({
        err:true,
        message:"Email khong hop le hoat ma kich hoat da het han",
    })
  }

   

}); 


module.exports = router;
