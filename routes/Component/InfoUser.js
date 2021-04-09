const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const User = require('../../models/User');

router.get('/:idUser', async (req,res) => {

    const user = await User.findOne({
        where:{
            id:req.params.idUser
        },
        
    })
   
  res.json({ 
    user
  });

}); 


module.exports = router;
