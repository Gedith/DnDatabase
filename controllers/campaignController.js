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
    const typeOfUser = req.session.typeOfUser
    campaignModule.getCampaignData(id)
    .then((campaignName) => {
        campaignModule.getPlayerCharactersFromCampaign(id)
        .then((characters) => {
            campaignModule.getWorlds(id)
            .then((worlds) => {
                res.render('campaignDetails', { campaignName, characters, worlds, typeOfUser, campaignID: id})
            })
        })
    })
}

const campaignDel = (req,res) => {
    campaignModule.campaignDel(req.session.campaignID)
    res.redirect("/home")
}

const indexAddPlayer = (req, res) => {
    campaignModule.getAvailablePlayers(req.session.campaignID)
    .then((data) => {
        res.render('addPlayer', { freeCharacters: data })
    }).catch((err) => {
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

const indexRules = (req, res) => {
    campaignModule.selectRules(req.session.campaignID)
    .then((pravidla) => {
        res.render('rules', { pravidla })
    })
    .catch((pravidla) => {
        res.render('rules', { pravidla })
    })
}

const indexAddRules = (req, res) => {
    res.render('addRules')
}

const addRules = (req, res) => {
    campaignModule.addRules(req.body.text, req.session.campaignID)
    res.redirect("/campaign/rules/")
}

const indexEditRules = (req, res) => {
    res.render('editRules')
}

const editRules = (req, res) => {
    campaignModule.editRules(req.body.text, req.session.campaignID)
    res.redirect("/campaign/rules/")
}

module.exports = {
    indexCreateCampaign,
    createCampaign,
    campaignDetails,
    indexAddPlayer,
    addPlayer,
    indexCreateWorld,
    createWorld,
    addRules,
    indexRules,
    indexAddPlayer,
    indexAddRules,
    indexEditRules,
    editRules,
    campaignDel
}