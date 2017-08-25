var express = require('express');
var router = express.Router();
var helper = require('../app')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//=========
var vision = require('@google-cloud/vision');

var visionClient = vision({
  projectId: 'valued-fortress-175314',
  keyFilename: 'Hackivrunner-4397af70ab6d.json'
});

const visionHelper = (req, res, next) => {
  //add
  var gambar = req.body.gambar
  // var gambar = ``

  // OK NOW we can use two input, pake gstorage, or pake link biasa=
  // var gcsImageUri = 'gs://hacktivrunner/runner2.jpg';
  var imageUri = gambar;
  var source = {
      // gcsImageUri : gcsImageUri
      imageUri : imageUri
  };
  var image = {
      source : source
  };
  var type = vision.v1.types.Feature.Type.TEXT_DETECTION;
  var featuresElement = {
      type : type
  };
  var features = [featuresElement];
  var requestsElement = {
      image : image,
      features : features
  };
  console.log('sampai sini')
  req.vision = [requestsElement];
  next()
}

//==========

router.post('/api', visionHelper, (req, res) => {
  visionClient.batchAnnotateImages({requests: req.vision})
  .then(function(responses) {
      var response = responses[0];
      console.log(response);
      // doThingsWith(response)
      res.send(response.responses[0].textAnnotations[0].description)
  })
  .catch(function(err) {
      console.error(err);
  });
})



// function in need
// visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
//     var response = responses[0];
//     console.log(response.textAnnotatiions);
//     // doThingsWith(response)
// })
// .catch(function(err) {
//     console.error(err);
// });


// acuan
  // images.multer.single('image'),
  // images.sendUploadToGCS,
  // (req, res) => {
  //   res.send({
  //     status: 200,
  //     message: 'Your file is successfully uploaded',
  //     link: req.file.cloudStoragePublicUrl
  //   })
  // })


module.exports = router;
