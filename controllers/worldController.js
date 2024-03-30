const worldModule = require('../modules/worldModule')

const indexWorldDetails = (req, res) => {
    req.session.worldID = req.params.id
    worldModule.getWorldName(req.params.id)
    .then((worldName) => {
        res.render('worldDetails', { worldName })
    })
}

module.exports = {
    indexWorldDetails
}