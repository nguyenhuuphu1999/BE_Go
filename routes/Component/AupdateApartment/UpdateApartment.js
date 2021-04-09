const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const UpdateApartment= require('../../../models/Apartment');

router.put('/:id', async (req,res) => {

    const check = await UpdateApartment.findAll({
        where:{
            id:req.params.id
        }
    })
   
    if(check != ""){
        const updateApartment = await UpdateApartment.update(
            {
                id_city:req.body.id_city,
                id_district:req.body.id_district,
                id_type_house:req.body.id_type_house,
                apartment_name: req.body.apartment_name,
                price: req.body.price,
                ratings :req.body.ratings,
                image_url:req.body.image_url,
                id_user_own:req.body.id_user_own,
                address:req.body.address,
                note_apartment:req.body.note_apartment
            },
            {
                where:{
                    id:req.params.id
                }
            }
           
        )
    
        res.json({
            message:"Update phong thanh cong",
            data:updateApartment
        })
    }else{
        res.json({
            message:"Ban dang co muu do gi voi data cua tui"
        })
    }


});


module.exports = router;
