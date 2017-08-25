var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

router.get('/', userController.getAll)
router.post('/', userController.insertData)
router.delete('/:id', userController.deleteData)
// router.put('/:id', userController.editData)

module.exports = router;
