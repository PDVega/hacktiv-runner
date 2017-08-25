const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

require('dotenv').config()

mongoose.connect('mongodb://irianto223:i3UAyDVoWKCupAtK@cluster0-shard-00-00-qtxxk.mongodb.net:27017,cluster0-shard-00-01-qtxxk.mongodb.net:27017,cluster0-shard-00-02-qtxxk.mongodb.net:27017/hacktivrunner?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected');
})

const index = require('./routes/index');
const runner = require('./routes/runner')
const user = require('./routes/user')
let signup = require('./routes/signup');
let signin = require('./routes/signin');
let api = require('./routes/api')

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/signup', signup);
app.use('/signin', signin);
app.use('/', index);
app.use('/runners', runner)
app.use('/users', user)
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000);
