const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require("path");
var fs = require('fs');
const UpdateProfileOwn= require('../../../models/RegisterAccountForOwn');
const  upload = multer({
    dest: path.join(__dirname, "../../../public/images")
})

router.put('/:id',upload.single('upload_file_input'), async (req,res) => {

    const checkOwn = await UpdateProfileOwn.findAll({
        where:{
            id:req.params.id
        }
    })

    var temPath = req.file.path;

   console.log(temPath);
    if(checkOwn == ""){
        console.log("123zo")
        const typeApartment = await UpdateProfileOwn.update(
            {
               
                about:req.body.about,
                email:req.body.email,
                phone_number:req.body.phone_number,
                full_user:req.body.full_user,
                language:req.body.language,
            },{
                where:{
                    id:req.body.id
                }
            }
            
        )

    res.json({ 
        message:"UpdateProfile for " +req.body.id + " succsessfull"
    });
    }else{
    res.json({message:"Tai khoan vua nhap khong ton tai"})
    }
   

});


module.exports = router;
