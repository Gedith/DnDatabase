const express = require('express')
const router = express.Router()
const worldController = require('../controllers/worldController')
const fs = require('fs')
const path = require('path')

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userID = req.body.user
        if(!fs.existsSync(path.join(__dirname,"..", "maps"))){
            fs.mkdir(path.join(__dirname,"..", "maps"), (err) => {
                if(err) throw err
            })            
        }
        if(!fs.existsSync(path.join(__dirname,"..", "maps", userID))){
        fs.mkdir(path.join(__dirname,"..", "maps", userID), (err) => {
            if(err) throw err
        })
        }
        cb(null, './maps/'+userID)
    },
    filename: function (req, file, cb) {
        const name = req.body.name
        req.session.extension = file.originalname.split(".")[1]
        cb(null, name+"."+file.originalname.split(".")[1])
    }
})

const upload = multer({ storage })

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

router.get('/world/maps', worldController.indexMaps)

router.get('/world/maps/add', worldController.indexAddMap)

router.post('/world/maps/add', upload.single('map'), worldController.addMap)

router.get('/world/maps/details/:id', worldController.indexMapDetail)

router.get('/world/maps/town/add', worldController.indexAddTown)

router.post('/world/maps/town/add', worldController.addTown)

router.get('/world/maps/town/details/:id', worldController.getTownData)

router.get('/world/animal/visibility/:id', worldController.animalVisibility)

router.get('/world/flower/visibility/:id', worldController.flowerVisibility)

router.get('/world/npc/visibility/:id', worldController.npcVisibility)

router.get('/world/map/visibility/:id', worldController.mapVisibility)

router.get('/world/animal/del/:id', worldController.animalDel)

router.get('/world/flower/del/:id', worldController.flowerDel)

router.get('/world/npc/del/:id', worldController.npcDel)

router.get('/world/maps/del/:name', worldController.mapDel)

router.get('/world/town/del/:id', worldController.townDel)

module.exports = router