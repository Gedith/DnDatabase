const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')

router.get('/campaign/create', campaignController.indexCreateCampaign)

router.post('/campaign/create', campaignController.createCampaign)

router.get('/campaign/details/:id', campaignController.campaignDetails)

router.get('/campaign/addPlayer', campaignController.indexAddPlayer)

router.post('/campaign/addPlayer', campaignController.addPlayer)

router.get('/world/create', campaignController.indexCreateWorld)

router.post('/world/create', campaignController.createWorld)

router.get('/campaign/rules/', campaignController.indexRules)

router.get('/campaign/rules/add', campaignController.indexAddRules)

router.post('/campaign/rules/create', campaignController.addRules)

router.get('/campaign/rules/edit', campaignController.indexEditRules)

router.post('/campaign/rules/edit', campaignController.editRules)

router.get('/campaign/del', campaignController.campaignDel)

module.exports = router