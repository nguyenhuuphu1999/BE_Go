const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Apartment = require('../../models/Apartment');
const ApartmentPhoto = require('../../models/ApartmentPhoto');
const DiaDiemNoiBat = require('../../models/DiaDiemNoiBat');

router.get('/:idTypeHouse/typeApartment', async (req,res) => {

    const typeApartment = await Apartment.findAll({
        where:{
            id_type_house:req.params.idTypeHouse
        },
        include:[{
            model:ApartmentPhoto,
            as:'apartment_image',
            attributes:['url_image']

        }]
        })
   

  res.json({ 
    typeApartment
  });

});


module.exports = router;
