const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')

router.get('/campaign/create', campaignController.indexCreateCampaign)

router.post('/campaign/create', campaignController.createCampaign)

router.get('/campaign/details/:id', campaignController.campaignDetails)

module.exports = router