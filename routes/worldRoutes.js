const express = require('express')
const router = express.Router()
const worldController = require('../controllers/worldController')

router.get('/world/details/:id', worldController.indexWorldDetails)

module.exports = router