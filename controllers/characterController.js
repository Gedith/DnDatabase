const characterModule = require('../modules/characterModule')

const indexCreateCharacter = (req, res) => {
    res.render('createCharacter')
}

const createCharacter = (req, res) => {
    characterModule.createCharacter(req.body.name, req.body.class, req.body.race,req.body.str, req.body.dex, req.body.int, req.body.cha, req.body.con, req.body.wis, req.session.userID)
    res.redirect('/home')
}

const characterDetails = (req, res) => {
    const id = req.params.id
    characterModule.getCharacterData(id)
    .then((character) => {
        res.render('characterDetails', { character })
    }).catch((message) => {
        console.log('catch message:'+message)
    })
}

const characterFreeDetails = (req, res) => {
    const id = req.params.id
    characterModule.getFreeCharacterData(id)
    .then((character) => {
        res.render('characterDetails', { character })
    })
}

const indexCharacterEdit = (req, res) => {
    const characterID = req.params.id
    characterModule.getFreeCharacterData(characterID)
    .then((character) => {
        res.render('editCharacter', { character })
    })
}

const editCharacter = (req, res) => {
    characterModule.editCharacter(req.params.id, req.body.name, req.body.class, req.body.race, req.body.level, req.body.str, req.body.dex, req.body.int, req.body.cha, req.body.con, req.body.wis, req.body.desc)
    res.redirect('/character/free/details/'+req.params.id)
}

module.exports = {
    indexCreateCharacter,
    createCharacter,
    characterDetails,
    indexCharacterEdit,
    editCharacter,
    characterFreeDetails
}