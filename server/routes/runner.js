var express = require('express');
var router = express.Router();
const runnerController = require('../controllers/runner')

router.get('/', runnerController.getAll)
router.post('/', runnerController.insertData)
router.delete('/:id', runnerController.deleteData)
router.put('/:id', runnerController.editData)

module.exports = router;
