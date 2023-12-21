var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loaispRoute = require('./routes/loaisp');
var sanphamRoute = require('./routes/sanpham');
var nccRoute =require('./routes/ncc');
var khachhangRoute =require('./routes/khachhang');
var nhanvienRoute =require('./routes/nhanvien');
var tintucRoute = require('./routes/tintuc');
var donhangRoute = require('./routes/donhang');
var hdnRoute = require('./routes/hoadonnhap');
var userRoute = require('./routes/users');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(loaispRoute);
app.use(sanphamRoute);
app.use(donhangRoute);
app.use(nccRoute);
app.use(tintucRoute);
app.use(khachhangRoute);
app.use(nhanvienRoute);
app.use(hdnRoute);
app.use(userRoute);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

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
