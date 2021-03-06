var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PromotionRouter = require('./routes/Promotion');
// var HotelRouter = require('./routes/Hotel_nearBy');
// var ChoOGanBanRouter = require('./routes/Cho_o_gan_ban');
///////////////////////////////////////   API    /////////////////////////////////////////////////////////


var HomeRouter = require('./routes/Page/Home');
var DiaDiemNoiBatChiTietRouter = require('./routes/Component/DiaDiemNoiBatChiTiet');
var TypeApartmentRouter = require('./routes/Component/TypeApartment');
var ApartmentDetail = require('./routes/Page/ApartmentDetail')
var CheckBooking = require('./routes/Component/CheckBooking')
var ListCheckBooking = require('./routes/Component/ListCheckBooking')
var InfoUser = require('./routes/Component/InfoUser')
var apartments = require('./routes/Page/Apartment')
var Register = require('./routes/Component/Register/Register')
var RegisterSocial = require('./routes/Component/Register/RegisterSocial')

var RegisterOwn = require('./routes/Component/Register/RegisterAccountForOwn')
var SendMailForandResgisterOwn  =require('./routes/Component/Register/SendMailForResgisterOwn');
var comfimRegister  =require('./routes/Component/ComfimResister');
var UpdateProfileOwn  =require('./routes/Component/UpdateOwn/UpdateProfileOwn');
var UploadImageOwn  =require('./routes/Component/UpdateImage/UploadImageAvataOwn');
var UploadMultiple  =require('./routes/Component/UpdateImage/UploadMultiple');
var City = require('./routes/Component/City/City');
var AddApartment  =require('./routes/Component/AddApartmentForOwn/AddApartment');
var UpdateApartment  =require('./routes/Component/AupdateApartment/UpdateApartment');
var TypeHouse = require('./routes/Component/TypeHouse/TypeHouse');
var Login = require('./routes/Login/Login');
var Profile = require('./routes/Component/Profile/Profile');
var Message =require('./routes/Message/Message')
// var swagger = require('./swagger/index.html');
var Rooms = require('./routes/Component/Rooms/Rooms');

var app = express();



// view engine setup

var whitelist = ['https://go-booking-fddaf.web.app','https://go-booking-fddaf.web.app/','https://api-dariu.web.app',"https://do-an-dariu.herokuapp.com", 'https://project-dariu.herokuapp.com','http://localhost:8001','https://do-an-nho-nho.herokuapp.com','http://localhost:4000','http://localhost:3001','http://localhost:3000']

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use(bodyParser.json({limit: '500kb'}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors(corsOptions))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/promotions',PromotionRouter);
app.use('/message',Message)

///////////////////////////////////////////////////////////////

app.use('/home',HomeRouter);
app.use('/apartments',DiaDiemNoiBatChiTietRouter);
// app.use('/apartments',TypeApartmentRouter);
// app.use('/apartments',ApartmentDetail);
// app.use('/apartments',CheckBooking);
// app.use('/apartments',ListCheckBooking);
app.use('/users',InfoUser);
app.use('/apartments',apartments);
app.use('/apartments',CheckBooking);
app.use('/register',Register);
app.use('/registerSocial',RegisterSocial);
app.use('/RegisterOwn',RegisterOwn);

app.use('/sendMailForResgister',SendMailForandResgisterOwn);
app.use('/comfimRegister',comfimRegister);
app.use('/users',UpdateProfileOwn);
app.use('/uploadImageOwn',UploadImageOwn);
app.use('/UploadMultiple',UploadMultiple);
app.use('/apartment',AddApartment);
app.use('/apartment',UpdateApartment);
app.use('/city',City);
app.use('/typeHouse', TypeHouse);
app.use('/room', Rooms);
app.use('/login',Login);
app.use('/profile',Profile)


// app.use('/swagger',swagger);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
