const worldModule = require('../modules/worldModule')
const fs = require('fs')
const { type } = require('os')
const path = require('path')

const indexWorldDetails = (req, res) => {
    req.session.worldID = req.params.id
    worldModule.getWorldName(req.params.id)
    .then((worldName) => {
        worldModule.getAnimalsFromWorld(req.session.worldID)
        .then((animals) => {
            worldModule.getFlowersFromWorld(req.session.worldID)
            .then((flowers) => {
                worldModule.getNPCsFromWorld(req.session.worldID)
                .then((npcs) => {
                    res.render('worldDetails', { worldName, animals, flowers, npcs, typeOfUser: req.session.typeOfUser })
                })
            })
        })
    })
}

const indexCreateAnimal = (req, res) => {
    res.render('createAnimal')
}

const createAnimal = (req, res) => {
    worldModule.createAnimal(req.body.name, req.body.species, req.body.description, req.session.worldID)
    res.redirect('/world/details/'+req.session.worldID)
}

const animalDetails = (req, res) => {
    const typeOfUser = req.session.typeOfUser
    worldModule.getAnimalData(req.params.id)
    .then((animal) => {
        res.render('animalDetails', { animal , typeOfUser})
    })
}

const indexCreateFlower = (req, res) => {
    res.render('createFlower')
}

const createFlower = (req, res) => {
    worldModule.createFlower(req.body.name, req.body.location, req.body.properties, req.session.worldID)
    res.redirect('/world/details/'+req.session.worldID)
}

const flowerDetails = (req, res) => {
    const typeOfUser = req.session.typeOfUser
    worldModule.getFlowerData(req.params.id)
    .then((flower) => {
        res.render('flowerDetails', { flower, typeOfUser })
    })
}

const indexCreateNPC = (req, res) => {
    res.render('createNPC')
}

const createNPC = (req, res) => {
    worldModule.createNPC(req.body.name, req.body.location, req.body.description, req.body.class, req.body.race, req.session.worldID)
    res.redirect('/world/details/'+req.session.worldID)
}

const NPCDetails = (req, res) => {
    worldModule.getNPCData(req.params.id)
    .then((npc) => {
        res.render('npcDetails', { npc })
    })
}

const indexMaps = (req, res) => {
    const userID = req.session.userID
    const worldID = req.session.worldID
    const typeOfUser = req.session.typeOfUser
    worldModule.getMaps(req.session.worldID)
    .then((maps) => {
        res.render('maps', { maps , userID, worldID, typeOfUser })
    })
}

const indexAddMap = (req, res) => {
    res.render('createMap', { userID: req.session.userID })
}

const addMap = (req, res) => {
    worldModule.addMap(req.body.name+"."+req.session.extension, req.session.worldID)
    res.redirect('/world/maps')
}

const indexMapDetail = (req, res) => {
    req.session.mapID = req.params.id
    const userID = req.session.userID
    const typeOfUser = req.session.typeOfUser
    worldModule.getMapData(req.params.id)
    .then((map) => {
        worldModule.getTowns(req.params.id)
        .then((towns) => {
            res.render('mapDetails', { map, userID, towns, typeOfUser})
        })
    })
}

const indexAddTown = (req, res) => {
    res.render('createTown')
}

const addTown = (req, res) => {
    worldModule.createTown(req.body.name, req.body.location, req.body.description, req.session.mapID)
    res.redirect('/world/maps/details/'+req.session.mapID)
}

const getTownData = (req, res) => {
    worldModule.getTownData(req.params.id)
    .then((town) => {
        res.render('townDetails', { town })
    })
}

const animalVisibility = (req, res) => {
    worldModule.changeAnimalVisibility(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

const flowerVisibility = (req, res) => {
    worldModule.changeFlowerVisibility(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

const npcVisibility = (req, res) => {
    worldModule.changeNPCVisibility(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

const mapVisibility = (req, res) => {
    worldModule.changeMapVisibility(req.params.id)
    res.redirect('/world/maps/')
}

const animalDel = (req, res) => {
    worldModule.animalDel(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

const flowerDel = (req, res) => {
    worldModule.flowerDel(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

const npcDel = (req, res) => {
    worldModule.npcDel(req.params.id)
    res.redirect('/world/details/'+req.session.worldID)
}

module.exports = {
    indexWorldDetails,
    indexCreateAnimal,
    createAnimal,
    animalDetails,
    indexCreateFlower,
    createFlower,
    flowerDetails,
    indexCreateNPC,
    createNPC,
    NPCDetails,
    indexMaps,
    indexAddMap,
    addMap,
    indexMapDetail,
    indexAddTown,
    addTown,
    getTownData,
    animalVisibility,
    flowerVisibility,
    npcVisibility,
    mapVisibility,
    animalDel,
    flowerDel,
    npcDel
}