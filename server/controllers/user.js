const userModel = require('../models/user')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

var getAll = (req, res) => {
  userModel.find()
  .then(dataUsers => {
    res.send(dataUsers)
  })
  .catch(err => {
    res.send(err)
  })
}

var insertData = (req, res) => {
  var salt = bcrypt.genSaltSync(8)
  var pass = bcrypt.hashSync(req.body.password, salt)

  userModel.create({
    username: req.body.username,
    password: pass,
    salt: salt,
    role: req.body.role || 'admin'
  })
  .then(() => {
    res.send('data added')
  })
  .catch(err => {
    res.send(err)
  })
}

var deleteData = (req, res) => {
  userModel.remove({
    _id: ObjectId(req.params.id)
  })
  .then(() => {
    res.send('data removed')
  })
  .catch(err => {
    res.send(err)
  })
}


module.exports = {
  getAll,
  insertData,
  deleteData
}
