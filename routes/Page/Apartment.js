const express = require("express");
const { Op, where } = require("sequelize");
const Apartment = require("../../models/Apartment");
const router = express.Router();
const nodemailer = require("nodemailer");
const booking = require("../../models/ApartmentBooking"); //apartments/
const ApartmentPhotos = require("../../models/ApartmentPhotos");
const History_booking = require("../../models/History_booking");
const City = require("../../models/City");
router.get("/city/:id/apartment", async (req, res) => {
  console.log(req.query.type);
  if (req.query.type == "hotels") {
    const result = await Apartment.findAll({
      where: {
        [Op.and]: [{ id_city: req.params.id }, { id_type_house: 1 }],
      },
      include: {
        model: ApartmentPhotos,
        as: "apartment_images",
        attributes: ["url_image"],
      },
      limit: 4,
    });
    res.json({
      result,
    });
  } else {
    if (req.query.type == "apartment") {
      const result = await Apartment.findAll({
        where: {
          [Op.and]: [{ id_city: req.params.id }, { id_type_house: 2 }],
        },
        include: {
          model: ApartmentPhotos,
          as: "apartment_images",
          attributes: ["url_image"],
        },
        limit: 4,
      });
      res.json({
        result,
      });
    } else {
      if (req.query.type == "motels") {
        const result = await Apartment.findAll({
          where: {
            [Op.and]: [{ id_city: req.params.id }, { id_type_house: 3 }],
          },
          include: {
            model: ApartmentPhotos,
            as: "apartment_images",
            attributes: ["url_image"],
          },
          limit: 4,
        });
        res.json({
          result,
        });
      } else {
        if (req.query.type == "tret") {
          const result = await Apartment.findAll({
            where: {
              [Op.and]: [{ id_city: req.params.id }, { id_type_house: 4 }],
            },
            include: {
              model: ApartmentPhotos,
              as: "apartment_images",
              attributes: ["url_image"],
            },
            limit: 4,
          });
          res.json({
            result,
          });
        }
      }
    }
  }
});

router.get("/city/:id", async (req, res) => {
  const result = await Apartment.findAll({
    where: {
      id_city: req.params.id,
    },
  });

  res.json({
    message: "get data id city search",
    data: result,
    error: false,
  });
});

router.post("/lich_su_dat_hang", async (req, res) => {
  console.log(req.body);
  const result = await History_booking.create({
    id_user: req.body.id_user,
    id_apartment:req.body.id_apartment,
    name_apartment: req.body.name_apartment,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    so_ngay: req.body.so_ngay + 1,
    so_tien: req.body.so_tien,
    tong_tien: req.body.tong_tien,
    image: req.body.image,
    ma_hoa_don: req.body.ma_hoa_don,
  });

  //sendmail
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nhp2132@gmail.com", // generated ethereal user
      pass: "Nyc2019@", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "nhp2132@gmail.com", // sender address
    to: req.body.email, // list of receivers
    subject: "CHI TIẾT ĐƠN HÀNG", // Subject line
    text: "", // plain text body
    html: `<P>Xin Chào <b>${req.body.ho_ten}</b></p> <p>
    <table style="width:100%">
        <tr style=" border-spacing: 5px">
          <th style=" border: 5px silid #ccc">Mã hóa đơn</th>
          <th style=" border: 5px silid #ccc">Tên căn hộ</th>
          <th style=" border: 5px silid #ccc">Check In</th>
          <th style=" border: 5px silid #ccc">Check Out</th>
          <th style=" border: 5px silid #ccc">Đơn Giá</th>
          <th style=" border: 5px silid #ccc">Số ngày</th>
          <th style=" border: 5px silid #ccc">Tổng Tiền</th>
        </tr>
        <tr >
          <td style="text-align: center"><b>${req.body.ma_hoa_don}</b></td>
          <td style="text-align: center"><b>${req.body.name_apartment}</b></td>
          <td style="text-align: center">${req.body.check_in}</td>
          <td style="text-align: center">${req.body.check_out}</td>
          <td style="text-align: center">${req.body.so_tien}</td>
          <td style="text-align: center">${req.body.so_ngay + 1}</td>
          <td style="text-align: center"><b>${
            (req.body.so_ngay + 1) * req.body.so_tien
          }</b></td>

        </tr>
    </table>
    </p> <p>Cảm ơn bạn đã lựa chọn GO</p>`, // html body
  });
  //end sendmail
  res.json({
    message: "add history booking successfully",
    Data: result,
    error: false,
  });
});

router.get("/lich_su_dat_hang/:id", async (req, res) => {
  console.log(req.body);
  const result = await History_booking.findAll({
    where: {
      id_user: req.params.id,
    },
  });

  res.json({
    message: "get history booking for user successfully",
    Data: result,
    error: false,
  });
});

router.get("/lich_su_dat_hang/:id/detail", async (req, res) => {
  console.log(req.body);
  const result = await History_booking.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.json({
    message: "get history booking thoeo id can ho successfully",
    Data: result,
    error: false,
  });
});

// router.get('/lich_su_dat_hang/:id/detail', async (req, res) => {
//   console.log(req.body)
//   const result = await History_booking.findAll({
//       where:{
//         id:req.params.id
//       }
//   })
//   res.json({
//     message:'Lich su booking khach hang theo id lich su',
//     Data:result,
//     error:false
//   })

// })

module.exports = router;
