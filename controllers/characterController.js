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

module.exports = {
    indexCreateCharacter,
    createCharacter,
    characterDetails
}