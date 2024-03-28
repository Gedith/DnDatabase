const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')

router.get('/campaign/create', campaignController.indexCreateCampaign)

router.post('/campaign/create', campaignController.createCampaign)

module.exports = router