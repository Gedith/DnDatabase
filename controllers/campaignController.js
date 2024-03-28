
const indexCreateCampaign = (req, res) => {
    res.render('createCampaign')
}

const createCampaign = (req, res) => {
    sql.query("INSERT INTO `kampane`(`Nazev`, `UzivateleID`) VALUES ('"+req.body.name+"','"+req.session.userID+"')", (err, sqlResult) => {
        if(err) throw err
    })
    res.redirect('/home')
}

module.exports = {
    indexCreateCampaign,
    createCampaign
}