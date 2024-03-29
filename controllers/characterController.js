const indexCreateCharacter = (req, res) => {
    res.render('createCharacter')
}

const createCharacter = (req, res) => {
    sql.query("INSERT INTO `hracskepostavy`(`Jmeno`, `Povolani`, `Rasa`, `Uroven`, `UzivateleID`) VALUES ('"+req.body.name+"','"+req.body.class+"','"+req.body.race+"',0,"+req.session.userID+")", (err, sqlResult) => {
        if(err) throw err
    })
    res.redirect('/home')
}

const characterDetails = (req, res) => {
    const id = req.params.id
    sql.query("SELECT * FROM hracskepostavy WHERE hracskepostavy.HracskepostavyID = "+id, (err, sqlResult) => {
        if(err) throw err    
        res.render('characterDetails', { character: sqlResult[0] })
    })

}

module.exports = {
    indexCreateCharacter,
    createCharacter,
    characterDetails
}