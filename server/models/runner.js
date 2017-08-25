const mongoose = require('mongoose')

const runnerSchema = mongoose.Schema({
  runner_number: String,
  name: String,
  jenis_kelamin: String
})

const Runner = mongoose.model('runners', runnerSchema)

module.exports = Runner
