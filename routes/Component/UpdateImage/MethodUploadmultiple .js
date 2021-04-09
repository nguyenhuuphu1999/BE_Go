var cloudinary = require('cloudinary').v2;
const streamifier   =require('streamifier')
async function MethodUploadFilemMultiple (res,temPath){
    try{
        console.log("method"+temPath)
        // const result = await cloudinary.uploader.upload(fileGettingUploaded);
        const result =await cloudinary.uploader.upload(temPath);
        console.log(result.url)
        return result.url
        // res.json({result});
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
module.exports.MethodUploadFilemMultiple=MethodUploadFilemMultiple;