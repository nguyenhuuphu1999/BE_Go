const { Router } = require('express');
const express = require('express');
const router = express.Router();

const TypeHouse = require('../../../models/TypeHouse');

router.get('/',async (req,res)=>{
    const resultTypeHouse = await TypeHouse.findAll({})
    res.json({
        message:"Get data TypeHouse Successfull ",
        data:resultTypeHouse,
        err:false
    })
})

module.exports=router