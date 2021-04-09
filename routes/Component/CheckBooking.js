const express = require("express");
const { Op, json } = require("sequelize");
// const { classToInvokable } = require("sequelize/types/lib/utils");
const Apartment = require("../../models/Apartment");
const ApartmentCheckBookings = require("../../models/ApartmentCheckBookings");
const router = express.Router();

const CheckBookings = require("../../models/ApartmentCheckBookings");
const History_booking = require("../../models/History_booking");
const User = require("../../models/User");
const { route } = require("../Page/Home");

router.post("/checkBooking", async (req, res) => {
  console.log(req.body);

  // const CheckBooking = await CheckBookings.findAll({
  //   where: {
  //     id_apartment: req.body.id_apartment,
  //   },
  // });
  // if (CheckBooking.length > 0) {
  const CheckBooking = await CheckBookings.findAll({
    where: {
      [Op.and]: [
        { id_apartment: req.body.id_apartment },
        {
          [Op.or]: [
            {
              check_in: {
                [Op.between]: [req.body.check_in, req.body.check_out],
              },
            },
            {
              check_out: {
                [Op.between]: [req.body.check_in, req.body.check_out],
              },
            },
            {
              check_in: {
                [Op.lte]: req.body.check_in,
              },
              check_out: {
                [Op.gte]: req.body.check_out,
              },
            },
            {
              check_in: {
                [Op.gte]: req.body.check_in,
              },
              check_out: {
                [Op.lte]: req.body.check_out,
              },
            },
          ],
        },
      ],

      // check_in: {
      //   $gte: req.body.check_in,
      //   $lte: req.body.checkout,
      // },
      // check_out: {
      //   $gte: req.body.check_in,
      //   $lte: req.body.checkout,
      // }
    },
  });
  console.log(CheckBooking);
  if (!CheckBooking.length) {
    res.json({
      message: "Bạn có thế booking phòng vào ngày này",
      err: false,
    });
  } else {
    res.json({
      message: "Xin lỗi ngày này , phòng này đã có người booking",
      err: true,
    });
  }
});

router.get("/:id/checkBooking", async (req, res) => {
  const result = await CheckBookings.findAll({
    where: {
      id_apartment: req.params.id,
    },
  });
  // .then(item=>{
  //   console.log(item)
  // })

  res.json({
    message: "get check bookin thanh cong",
    data: result,
    err: false,
  });
});

router.post("/booking", async (req, res) => {
  console.log(req.body);


  const result_lich_su = await History_booking.create({
    id_user: req.body.id_user,
    id_own:req.body.id_own,
    id_apartment: req.body.id_apartment,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    name_apartment:req.body.name_apartment,
    so_ngay:req.body.so_ngay,
    so_tien:req.body.so_tien,
    tong_tien:req.body.tong_tien,
    image:req.body.image,
    ma_hoa_don:req.body.ma_hoa_don
  });

  const result = await CheckBookings.create({
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    id_apartment: req.body.id_apartment,
    id_user_booking: req.body.id_user,
  });

  console.log(result)
  console.log(result_lich_su)
  

  res.json({
    message: "ban da dat phong thanh cong ",
    data: result,
    data2:result_lich_su,
    error: false,
  });
});

router.post("/lich_su_dat_phong", async (req, res) => {
  var arr_apartment = [];
  req.body.data.map(async (item) => {
    const result = await Apartment.findAll({
      where: {
        id: item,
      },
    });
    console.log(result);
    arr_apartment.push(result);
  });

  res.json({
    Data: arr_apartment,
  });
});

router.post('/info-booking_chu_nha',async(req,res)=>{
    const result = await History_booking.findAll({
      where:{
        id_own:req.body.id_own 
      },
      include:{
        model:User,
        as:'info',
        
      }
    })
  
    res.json({
      message:"get data thoe id chu nha",
      data:result,
    
      error:false
    })
})

module.exports = router;
