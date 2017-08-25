var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res) {
  res.send('welcome :)')
});

router.post('/login', indexController.login)



module.exports = router;
