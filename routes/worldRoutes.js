const express = require('express')
const router = express.Router()
const worldController = require('../controllers/worldController')

router.get('/world/details/:id', worldController.indexWorldDetails)

router.get('/world/animal/add', worldController.indexCreateAnimal)

router.post('/world/animal/add', worldController.createAnimal)

router.get('/world/animal/details/:id', worldController.animalDetails)

router.get('/world/flower/add', worldController.indexCreateFlower)

router.post('/world/flower/add', worldController.createFlower)

router.get('/world/flower/details/:id', worldController.flowerDetails)

router.get('/world/npc/add', worldController.indexCreateNPC)

router.post('/world/npc/add', worldController.createNPC)

router.get('/world/npc/details/:id', worldController.NPCDetails)

module.exports = router