const worldModule = require('../modules/worldModule')

const indexWorldDetails = (req, res) => {
    req.session.worldID = req.params.id
    worldModule.getWorldName(req.params.id)
    .then((worldName) => {
        worldModule.getAnimalsFromWorld(req.session.worldID)
        .then((animals) => {
            worldModule.getFlowersFromWorld(req.session.worldID)
            .then((flowers) => {
                res.render('worldDetails', { worldName, animals, flowers, typeOfUser: req.session.typeOfUser })
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
    worldModule.getAnimalData(req.params.id)
    .then((animal) => {
        res.render('animalDetails', { animal })
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
    worldModule.getFlowerData(req.params.id)
    .then((flower) => {
        res.render('flowerDetails', { flower })
    })
}

module.exports = {
    indexWorldDetails,
    indexCreateAnimal,
    createAnimal,
    animalDetails,
    indexCreateFlower,
    createFlower,
    flowerDetails
}