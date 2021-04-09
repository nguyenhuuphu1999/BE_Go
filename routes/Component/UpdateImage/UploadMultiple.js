const express = require('express');
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require("path");
var fs = require('fs');
const MethodUploadFile = require('../../Component/UpdateImage/MethodUploadmultiple .js')
const  upload = multer({
    dest: path.join(__dirname, "../../../public/images")
})

router.post('/multiple',upload.array("upload_file_input",6),async (req,res,next)=>{

    // console.log(req.file.path)
    var temPath = await req.files.map(async function(file){
      // const result = await  MethodUploadFile.MethodUploadFilemMultiple(res,file.path);
        console.log("dong 1" + file.path)
    });
    console.log("dong 2" + temPath.path)
    

    
 
})

module.exports = router;