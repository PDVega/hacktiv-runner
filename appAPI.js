var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//=================
var vision = require('@google-cloud/vision');

var visionClient = vision({
  projectId: 'valued-fortress-175314',
  keyFilename: 'Hackivrunner-4397af70ab6d.json'
});

var gcsImageUri = "gs://hacktivrunner/demo-image.jpg";
var source = {
    gcsImageUri : gcsImageUri
};
var image = {
    source : source
};
var type = vision.v1.types.Feature.Type.FACE_DETECTION;
var featuresElement = {
    type : type
};
var features = [featuresElement];
var requestsElement = {
    image : image,
    features : features
};
var requests = [requestsElement];
// visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
//     var response = responses[0];
//     console.log(response.textAnnotatiions);
//     // doThingsWith(response)
// })
// .catch(function(err) {
//     console.error(err);
// });

//==================== test 3 - msh virgin
// var vision = require('@google-cloud/vision');
//
// var visionClient = vision({
//   projectId: 'grape-spaceship-123',
//   keyFilename: '/path/to/keyfile.json'
// });
//
// var gcsImageUri = 'gs://gapic-toolkit/President_Barack_Obama.jpg';
// var source = {
//     gcsImageUri : gcsImageUri
// };
// var image = {
//     source : source
// };
// var type = vision.v1.types.Feature.Type.FACE_DETECTION;
// var featuresElement = {
//     type : type
// };
// var features = [featuresElement];
// var requestsElement = {
//     image : image,
//     features : features
// };
// var requests = [requestsElement];
// visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
//     var response = responses[0];
//     // doThingsWith(response)
// })
// .catch(function(err) {
//     console.error(err);
// });

//================test2
// const Vision = require('@google-cloud/vision');
//
// // Instantiates a client
// const vision = Vision();
//
// // The path to the local image file, e.g. "/path/to/image.png"
// // const fileName = '/path/to/image.png';
//
// // Performs text detection on the local file
// vision.textDetection({ source: { filename: fileName } })
//   .then((results) => {
//     const detections = results[0].textAnnotations;
//     console.log('Text:');
//     detections.forEach((text) => console.log(text));
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
//=================test1
// Imports the Google Cloud client library
// const Vision = require('@google-cloud/vision');
//
// // Instantiates a client
// const vision = Vision();
//
// // The name of the image file to annotate
// const fileName = 'demo-image.jpg';
//
// // Prepare the request object
// const request = {
//   source: {
//     filename: fileName
//   }
// };
//
// // Performs label detection on the image file
// vision.labelDetection(request)
//   .then((results) => {
//     const labels = results[0].labelAnnotations;
//
//     console.log('Labels:');
//     labels.forEach((label) => console.log(label.description));
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
  //=================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
