const campaignModule = require('../modules/campaignModule')

const indexCreateCampaign = (req, res) => {
    res.render('createCampaign')
}

const createCampaign = (req, res) => {
    campaignModule.createCampaign(req.body.name, req.session.userID)
    res.redirect('/home')
}

const campaignDetails = (req, res) => {
    const id = req.params.id
    req.session.campaignID = id
    const kampane = req.session.kampane
    for (let i = 0; i < kampane.length; i++) {
        if(kampane[i].ID == id){
            var spravnaKampan = kampane[i]
        }
    }
    campaignModule.getPlayerCharactersFromCampaign(id)
    .then((characters) => {
        campaignModule.getWorlds(id)
        .then((svety) => {
            res.render('campaignDetails', { kampan: spravnaKampan, characters, worlds: svety })
        })
    })
}

const indexAddPlayer = (req, res) => {
    campaignModule.getAvailablePlayers(req.session.campaignID)
    .then((data) => {
        res.render('addPlayer', { freeCharacters: data })
    }).catch((err) => {
        //hodit do statusu
        console.log(err)
    })
}

const addPlayer = (req, res) => {
    campaignModule.addPlayerToCampaign(req.body.chosenCharacterName, req.session.campaignID)
    res.redirect('/campaign/details/'+req.session.campaignID)
}

const indexCreateWorld = (req, res) => {
    res.render('createWorld')
}

const createWorld = (req, res) => {
    campaignModule.createWorld(req.body.name, req.session.campaignID)
    res.redirect('/campaign/details/'+req.session.campaignID)
}

module.exports = {
    indexCreateCampaign,
    createCampaign,
    campaignDetails,
    indexAddPlayer,
    addPlayer,
    indexCreateWorld,
    createWorld
}