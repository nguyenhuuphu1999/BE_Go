const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const Apartment = require('../../models/Apartment');

const Comment = require('../../models/ApartmentComment');
const ApartmentPhotos = require('../../models/ApartmentPhotos');
const User = require('../../models/User');
const ApartmentDetail = require('../../models/ApartmentDetail');

router.get('/:id/detail', async (req,res) => {

    const apartmentPhotos =await ApartmentPhotos.findAll({
        where:{
            id_partment:req.params.id
        },
        attributes:['url_image']
    })

    const apartment = await Apartment.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','id_city','apartment_name','price','ratings']

        
    })

    const apartmentDetail = await ApartmentDetail.findOne({
        where:{
            id_apartment:req.params.id
        },
    })

    const comment = await Comment.findAll({
        where:{
            id_apartment:req.params.id
        },
        include:[{
            model:User,
            as:'user',
            attributes:['address']
        }],
        limit:3,
        attributes:['id_apartment','comment','rattings']
    })

    res.json({
        apartmentPhotos,apartment,apartmentDetail,
        comment
    })

});


module.exports = router;
