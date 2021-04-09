const express = require('express');
const { Op } = require('sequelize');
const City = require('../models/City');
const router = express.Router();

const Promotion = require('../models/Promotion');

router.get('/', async (req,res) => {
  const now = new Date();

  const promotions = await Promotion.findAll({
    where: {
      expiration_date: {
        [Op.gt]:  new Date().toISOString().slice(0, 10)
      }
    }, 
    include: {
      model: City,
      as:"city",
      attributes:['name_city']
    },
  });
  console.log(  new Date().toISOString().slice(0, 10))
  res.json({ data: promotions })
});


module.exports = router;
