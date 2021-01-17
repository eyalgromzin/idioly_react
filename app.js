// var createError = require('http-errors');
var cors = require('cors');
var express = require('express');

var app = express();

app.use(cors())

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

//mongoose api
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testapi');  //works only when you type it in url with small letters
var textsRouter = require('./routes/texts');  
var textLikesDislikesRouter = require('./routes/textLikesDislikes');  

app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/texts', textsRouter);
app.use('/textLikesDislikes', textLikesDislikesRouter);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const db = "mongodb://eyalgromzin:vutuduPassword11@cluster0-shard-00-00-v6pxg.mongodb.net:27017,cluster0-shard-00-01-v6pxg.mongodb.net:27017,cluster0-shard-00-02-v6pxg.mongodb.net:27017/wordPractice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use(logger('dev'));
// app.use(express.json());

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.options('/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
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
