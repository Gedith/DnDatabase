const bcrypt = require('bcrypt')
const saltRounds = 10

const index = (req, res) => {
    res.render('login')
}

const registrationIndex = (req,res) => {
    res.render('registration')
}

const registrationCreateUser = (req,res) => {
    let name = Object.values(req.body)[0]
    let pass = Object.values(req.body)[1]
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if(err) throw err
        sql.query("INSERT INTO `uzivatele`(`Heslo`, `Jmeno`) VALUES ('"+hash+"','"+name+"')", (err,res) => {
            if(err) throw err
            console.log(res)
        })
    })
    res.render('login')
}

const homePage = (req, res) => {
    let kampane = []
    sql.query("SELECT KampaneID, Nazev FROM kampane WHERE kampane.UzivateleID = "+req.session.userID, (err, sqlResult) => {
        if(err) throw err
        sqlResult.forEach((data) => {
            kampane.push({
                ID: data.KampaneID,
                Nazev: data.Nazev
            })
        })
        req.session.kampane = kampane
        res.render('home', { userName: req.session.userName, typeOfUser: req.session.typeOfUser, kampane: kampane})
    })
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

const login = (req,res) => {
    let type = Object.values(req.body)[0]
    let name = Object.values(req.body)[1]
    let pass = Object.values(req.body)[2]
    sql.query("SELECT Jmeno, Heslo, UzivateleID FROM `uzivatele` WHERE Jmeno = '"+name+"'", (err, sqlResult) => {
        if(err) throw err
        if(sqlResult.length > 0){
            bcrypt.compare(pass, sqlResult[0].Heslo, (err, compare) => {
                if(compare == true){
                    req.session.userName = name
                    req.session.typeOfUser = type
                    req.session.userID = sqlResult[0].UzivateleID
                    res.redirect('home')
                } else {
                    console.log('Wrong password')
                    res.redirect('/')
                }
            })
        } else {
            console.log('Noone was found in the database')
            res.redirect('/')
        }
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