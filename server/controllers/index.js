const userModel = require('../models/user')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')


var login = (req, res) => {
  userModel.findOne({
    username: req.body.username
  })
  .then(dataUser => {
    if (bcrypt.compareSync(req.body.password, dataUser.password)) {
      var token = jwt.sign({
        id: dataUser._id,
        username: dataUser.username,
        role: dataUser.role
      }, process.env.TOKEN_JWT);
      res.send(token)
    }
    else {
      res.send('password salah')
    }
  })
  .catch(err => {
    console.log(err);
    res.send('username tidak ada')
  })
}


module.exports = {
  login
}
