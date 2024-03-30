const mainModule = require('../modules/mainModule')

const index = (req, res) => {
    res.render('login')
}

const registrationIndex = (req,res) => {
    res.render('registration')
}

const registrationCreateUser = (req,res) => {
    mainModule.createUser(req.body.name, req.body.pass)
    res.render('login')
}

const homePage = (req, res) => {
    var typeOfUser =  req.session.typeOfUser
    var userID = req.session.userID
    if(typeOfUser == 'PJ'){
        mainModule.getCampaignsFromUser(userID)
        .then((kampane) => {            
            req.session.kampane = kampane
            res.render('home', { userName: req.session.userName, kampane: kampane, typeOfUser, characters: null})
        }).catch((message) => {
            console.log(message)
        })
    } else if(typeOfUser == 'Player'){
        mainModule.getHracskePostavy(userID)
        .then((characters) => {
            req.session.characters = characters
            res.render('home', { userName: req.session.userName, characters, typeOfUser, kampane: null })
        }).catch((message) => {
            console.log(message)
        })
    }
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

const login = (req,res) => {
    let type = Object.values(req.body)[0]
    let name = Object.values(req.body)[1]
    let pass = Object.values(req.body)[2]
    mainModule.login(name, pass)
    .then((user) => {        
        req.session.userID = user
        req.session.userName = name
        req.session.typeOfUser = type
        res.redirect('home')
    }).catch((message) => {
        console.log(message)
        res.redirect('/')  
    })
}

module.exports = {
    index,
    registrationIndex,
    registrationCreateUser,
    homePage,
    logout,
    login
}