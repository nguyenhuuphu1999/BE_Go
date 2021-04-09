const express = require('express');
const router = express.Router();

const Room = require('../../../models/Rooms');



router.get('/', async(req,res)=>{
    const resultRoom = await Room.findAll({})
    res.json({
        message:"Get data Rooms Successfull ",
        data:resultRoom,
        err:false
    })
})

module.exports=router