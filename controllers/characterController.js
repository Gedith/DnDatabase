const characterModule = require('../module/characterModule')

const indexCreateCharacter = (req, res) => {
    res.render('createCharacter')
}

const createCharacter = (req, res) => {
    sql.query("INSERT INTO `hracskepostavy`(`Jmeno`, `Povolani`, `Rasa`, `Uroven`, `UzivateleID`) VALUES ('"+req.body.name+"','"+req.body.class+"','"+req.body.race+"',0,"+req.session.userID+")", (err, sqlResult) => {
        if(err) throw err
    })
    res.redirect('/home')
}

const characterDetails = async (req, res) => {
    const id = req.params.id
    await characterModule.getCharacterData(id)
    .then((message) => {
        res.render('characterDetails', { character: message })
    }).catch((message) => {
        console.log('catch message:'+message)
    })
}

const indexCharacterEdit = (req, res) => {
    const characterID = req.params.id
    characterModule.getCharacterData(characterID)
    .then((character) => {
        res.render('editCharacter', { character })
    })
}

const editCharacter = (req, res) => {
    characterModule.editCharacter(req.params.id, req.body.name, req.body.class, req.body.race, req.body.level)
    res.redirect('/character/details/'+req.params.id)
}

module.exports = {
    indexCreateCharacter,
    createCharacter,
    characterDetails,
    indexCharacterEdit,
    editCharacter
}