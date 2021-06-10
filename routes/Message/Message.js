var express = require('express');
var router = express.Router();

router.get('/message',async(req,res)=>{
    console.log(req.params)
})
module.exports = router;