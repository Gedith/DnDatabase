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
    const typeOfUser = req.session.typeOfUser
    const username = req.session.userName
    characterModule.getCharacterData(id)
    .then((character) => {
        res.render('characterDetails', { character, username, typeOfUser })
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

const characterDel = (req, res) => {
    characterModule.characterDel(req.params.id)
    res.redirect('/home')
}

const getSpells = (req, res) => {
    const typeOfUser = req.session.typeOfUser
    req.session.characterID = req.params.id
    characterModule.getSpells(req.params.id)
    .then((spells) => {
        res.render('characterSpells', { spells, typeOfUser, characterID: req.params.id })
    })
}

const indexCreateSpell = (req, res) => {
    res.render('createSpell')
}

const createSpell = (req, res) => {
    characterModule.createSpell(req.body.name, req.body.desc, req.session.characterID)
    res.redirect('/character/details/'+req.session.characterID)
}

const delSpell = (req, res) => {
    characterModule.delSpell(req.params.id)
    res.redirect('/character/spells/'+req.session.characterID)
}

module.exports = {
    indexCreateCharacter,
    createCharacter,
    characterDetails,
    indexCharacterEdit,
    editCharacter,
    characterFreeDetails,
    characterDel,
    getSpells,
    indexCreateSpell,
    createSpell,
    delSpell
}