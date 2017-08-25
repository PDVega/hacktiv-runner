var express = require('express');
var router = express.Router();
var helper = require('../app')
const runnerController = require('../controllers/runner')
const runnerModel = require('../models/runner')



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

router.post('/', visionHelper, (req, res) => {
  visionClient.batchAnnotateImages({requests: req.vision})
  .then(function(responses) {
      // var response = responses[0];
      console.log(responses[0].responses[0].textAnnotations[0].description);
      // doThingsWith(response)
      runnerModel.find({
        runner_number: responses[0].responses[0].textAnnotations[0].description.trim()
        // response.responses[0].textAnnotations[0].description
      })
      .then(dataRunners => {
        // console.log(responses[0].responses[0].textAnnotations[0].description);
        // console.log(dataRunners);
        res.send(dataRunners)
        // res.send(response.responses[0].textAnnotations[0].description)
      })
  })
  .catch(function(err) {
      console.error(err);
  });
})

var getAll = (req, res) => {
  if (req.headers.token == null) {
    res.send('Anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
    // if (decoded.role == 'admin') {
      runnerModel.find()
      .then(dataRunners => {



        var getAll = (req, res) => {
          if (req.headers.token == null) {
            res.send('Anda belum login')
          }
          else {
            var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
            // if (decoded.role == 'admin') {
              runnerModel.find()
              .then(dataRunners => {
                res.send(dataRunners)
              })
              .catch(err => {
                res.send(err)
              })
            // }
            // else {
            //   res.send('Anda bukan admin')
            // }
          }
        }
        res.send(dataRunners)
      })
      .catch(err => {
        res.send(err)
      })
    // }
    // else {
    //   res.send('Anda bukan admin')
    // }
  }
}


// router.get('/', runnerController.getAll)



module.exports = router;
