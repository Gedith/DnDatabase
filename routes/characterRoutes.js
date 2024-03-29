const express = require('express')
const router = express.Router()
const characterController = require('../controllers/characterController')

router.get('/character/create', characterController.indexCreateCharacter)

router.post('/character/create', characterController.createCharacter)

router.get('/character/details/:id', characterController.characterDetails)

module.exports = router