const indexCreateCampaign = (req, res) => {
    res.render('createCampaign')
}

const createCampaign = (req, res) => {
    sql.query("INSERT INTO `kampane`(`Nazev`, `UzivateleID`) VALUES ('"+req.body.name+"','"+req.session.userID+"')", (err, sqlResult) => {
        if(err) throw err
    })
    res.redirect('/home')
}

const campaignDetails = (req, res) => {
    const id = req.params.id
    const kampane = req.session.kampane
    for (let i = 0; i < kampane.length; i++) {
        if(kampane[i].ID == id){
            console.log(kampane[i])
            var spravnaKampan = kampane[i]
        }
    }
    res.render('campaignDetails', { kampan: spravnaKampan})
}

module.exports = {
    indexCreateCampaign,
    createCampaign,
    campaignDetails
}