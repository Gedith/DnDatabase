const express = require('express')
const router = express.Router()
const characterController = require('../controllers/characterController')

router.get('/character/create', characterController.indexCreateCharacter)

router.post('/character/create', characterController.createCharacter)

router.get('/character/details/:id', characterController.characterDetails)

router.get('/character/edit/:id', characterController.indexCharacterEdit)

router.post('/character/edit/:id', characterController.editCharacter)

router.get('/character/free/details/:id', characterController.characterFreeDetails)

router.get('/character/del/:id', characterController.characterDel)

router.get('/character/spells/:id', characterController.getSpells)

router.get('/character/spell/create', characterController.indexCreateSpell)

router.post('/character/spell/create', characterController.createSpell)

router.get('/character/spell/del/:id', characterController.delSpell)

module.exports = router