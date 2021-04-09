const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const CheckBookings = require('../../models/ApartmentCheckBookings')

router.get('/:id_apartment/bookings', async (req,res) => {
        
   
       
        const listCheckBooking = await CheckBookings.findAll(
        {
            where:{
                id_apartment:req.params.id_apartment
        }
        })
        
        res.json({
            data:listCheckBooking
        })

});

module.exports = router;
