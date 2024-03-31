const bcrypt = require('bcrypt')
const saltRounds = 10


const createUser = (name, pass) => {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if(err) throw err
        sql.query("INSERT INTO `uzivatele`(`Heslo`, `Jmeno`) VALUES ('"+hash+"','"+name+"')", (err,res) => {
            if(err) throw err
        })
    })
}

const getCampaignsFromUser = (userID) => {
    return new Promise ((resolve, reject) => {
        sql.query("SELECT KampaneID, Nazev FROM kampane WHERE kampane.UzivateleID = "+userID, (err, sqlResult) => {
            let kampane = []
            if(err) throw err
            sqlResult.forEach((data) => {
                kampane.push({
                    ID: data.KampaneID,
                    Nazev: data.Nazev
                })
            })
            resolve(kampane)
        })
    })
}

const getHracskePostavy = (userID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM `hracskepostavy` WHERE Hracskepostavy.UzivateleID = "+userID+" AND KampaneID IS NOT NULL", (err, sqlResult) => {
            let characters = []
            if(err) throw err
            sqlResult.forEach((character) => {
                characters.push({
                    ID: character.HracskepostavyID,
                    name: character.Jmeno,
                    level: character.Uroven
                })
            })
            resolve(characters)
        })
    })
}

const getFreeHracskePostavy = (userID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM `hracskepostavy` WHERE Hracskepostavy.UzivateleID = "+userID+" AND KampaneID IS NULL", (err, sqlResult) => {
            let characters = []
            if(err) throw err
            sqlResult.forEach((character) => {
                characters.push({
                    ID: character.HracskepostavyID,
                    name: character.Jmeno,
                    level: character.Uroven
                })
            })
            resolve(characters)
        })
    })
}

const login = (name, pass) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT Jmeno, Heslo, UzivateleID FROM `uzivatele` WHERE Jmeno = '"+name+"'", (err, sqlResult) => {
            if(err) throw err
            if(sqlResult.length > 0){
                bcrypt.compare(pass, sqlResult[0].Heslo, (err, compare) => {
                    if(compare == true){
                        resolve(sqlResult[0].UzivateleID)
                    } else {
                        reject('Wrong password')
                    }
                })
            } else {
                reject('Noone was found in the database')
            }
        })
    })
}

module.exports = {
    createUser,
    getCampaignsFromUser,
    getHracskePostavy,
    login,
     getFreeHracskePostavy
}