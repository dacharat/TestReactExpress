var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const Article = require('./models/article')
mongoose.connect('mongodb://localhost:27017/nodekb', {
  useNewUrlParser: true
})
var db = mongoose.connection
db.once('open', () => console.log('connected to MongoDB.'))
db.on('error', console.error.bind(console, 'connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/get', (req, res) => {
  Article.find({}, (err, articles) => {    
    res.send({ articles })
  })
})

app.post('/add', (req, res) => {
  const article = new Article()
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body
  article.save()
  res.send({ article })
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
