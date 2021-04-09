const nodemailer = require("nodemailer");

function transporter (){
    
    let  transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "nhp2132@gmail.com", // generated ethereal user
          pass: "Nyc2019@" // generated ethereal password
        },
      
      });
      return transporter;
}

function mailOptions(email,title,content){
    let mailOptions = {
        from: 'nhp2132@gmail.com',
        to: email,
        subject:title,
        text: 'Mã Xác Nhận Của Bạn là:',
        html: content
    };
    return mailOptions
    console.log('Ban da send main thnah cong ')
}

module.exports.transporter=transporter;
module.exports.mailOptions=mailOptions;
