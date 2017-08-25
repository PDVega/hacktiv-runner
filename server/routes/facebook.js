const express = require('express')
const router = express.Router()
const FB = require('fb')
const fb = new FB.Facebook({version: 'v2.8'})

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

router.get('/facebook', setAccessToken, (req, res) => {
  FB.api('/me', {field: ['id', 'name', 'email']}, function(response){
    res.send(response)
  })
})

module.exports = router;
