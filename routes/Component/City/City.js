const express = require('express');
const router = express.Router();

const City = require('../../../models/City');

router.get('/',async (req,res)=>{
    const resultCity = await City.findAll({

    })
    res.json({
        message:"Get data Sucessfull",
        data: resultCity,
        err:false
    })
})
module.exports=router;