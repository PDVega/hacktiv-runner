const runnerModel = require('../models/runner')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config()

var getAll = (req, res) => {
  // if (req.headers.token == null) {
  //   res.send('Anda belum login')
  // }
  // else {
    // var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
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
  // }
}

var insertData = (req, res) => {
  if (req.headers.token == null) {
    res.send('Anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
    if (decoded.role == 'admin') {
      runnerModel.create({
        runner_number: req.body.runner_number,
        name: req.body.name,
        jenis_kelamin: req.body.jenis_kelamin
      })
      .then(() => {
        res.send('data added')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.send('Anda bukan admin')
    }
  }
}

var deleteData = (req, res) => {
  if (req.headers.token == null) {
    res.send('Anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
    if (decoded.role == 'admin') {
      runnerModel.remove({
        _id: ObjectId(req.params.id)
      })
      .then(() => {
        res.send('data removed')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.send('Anda bukan admin')
    }
  }
}

var editData = (req, res) => {
  if (req.headers.token == null) {
    res.send('Anda belum login')
  }
  else {
    var decoded = jwt.verify(req.headers.token, process.env.TOKEN_JWT);
    if (decoded.role == 'admin') {
      runnerModel.update({
        _id: ObjectId(req.params.id)
      },
      {
        runner_number: req.body.runner_number,
        name: req.body.name,
        jenis_kelamin: req.body.jenis_kelamin
      })
      .then(() => {
        res.send('data updated')
      })
      .catch(err => {
        res.send(err)
      })
    }
    else {
      res.send('Anda bukan admin')
    }
  }
}


module.exports = {
  getAll,
  insertData,
  deleteData,
  editData
}
