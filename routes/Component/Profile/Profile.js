const express = require('express');
const router = express.Router();

const User = require('../../../models/User')

router.put('/:id',async(req,res)=>{
    console.log(req.body)
    const result = await User.update(
        {
            full_name:req.body.full_name,
            email:req.body.email,
            phone_number:req.body.phone_number,
            address: req.body.address,
            description:req.body.description
        },
        {
            where:{
                id:req.params.id
            }
        }
    )
    res.json({
        data:result
    })
})
router.get('/:id',async(req,res)=>{
  const result = await User.findOne({
      where:{
          id:req.params.id
      }
  })
  console.log(result)
  res.json({
      data:result
  })
})

module.exports = router;