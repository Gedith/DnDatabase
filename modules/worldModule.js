const { get } = require("../routes/worldRoutes")

const getWorldName = (worldID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT svety.JmenoSveta FROM `svety` WHERE svety.SvetyID = "+worldID, (err, sqlResult) => {
            if(err) throw err
            resolve(sqlResult[0].JmenoSveta)
        })
    })
}

const createAnimal = (name, species, description, worldID) => {
    sql.query("INSERT INTO `zivocichove`(`Druh`, `Nazev`, `Popis`, `SvetyID`) VALUES ('"+species+"','"+name+"','"+description+"','"+worldID+"')", (err, sqlResult) => {
        if(err) throw err
    })
}

const getAnimalsFromWorld = (worldID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM `zivocichove` WHERE zivocichove.SvetyID = "+worldID, (err, sqlResult) => {
            if(err) throw err
            const animals = []
            sqlResult.forEach((animal) => {
                animals.push({
                    ID: animal.ZivocichoveID,
                    name: animal.Nazev,
                    species: animal.Druh,
                    description: animal.description,
                    visible: animal.ViditelneHraci
                })
            })
            resolve(animals)
        })
    })
}

const getAnimalData = (animalID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM `zivocichove` WHERE zivocichove.ZivocichoveID = "+animalID, (err, sqlResult) => {
            const animal = {
                ID: sqlResult[0].ZivocichoveID,
                name: sqlResult[0].Nazev,
                species: sqlResult[0].Druh,
                description: sqlResult[0].Popis,
                visible: sqlResult[0].ViditelneHraci
            }
            resolve(animal)
        })
    })
}

const createFlower = (name, location, properties, worldID) => {
    sql.query("INSERT INTO `kytky`(`Mistovyskytu`, `Nazev`, `Vlastnosti`, `SvetyID`) VALUES ('"+location+"','"+name+"','"+properties+"','"+worldID+"')", (err, sqlResult) => {
        if(err) throw err
    })
}

const getFlowersFromWorld = (worldID) => {
    return new Promise ((resolve, reject) => {
        sql.query("SELECT * FROM `kytky` WHERE kytky.SvetyID = "+worldID, (err, sqlResult) => {
            const flowers = []
            sqlResult.forEach((flower) => {
                flowers.push({
                    ID: flower.KytkyID,
                    name: flower.Nazev,
                    location: flower.MistoVyskytu,
                    visible: flower.ViditelneHraci
                })
            })
            resolve(flowers)
        })
    })
}

const getFlowerData = (flowerID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM `kytky` WHERE kytky.KytkyID ="+flowerID, (err, sqlResult) => {
            if(err) throw err
            const flower = {
                ID: sqlResult[0].KytkyID,
                name: sqlResult[0].Nazev,
                location: sqlResult[0].Mistovyskytu,
                properties: sqlResult[0].Vlastnosti,
                visible: sqlResult[0].ViditelneHraci
            }
            resolve(flower)
        })
    })
}

module.exports = {
    getWorldName,
    createAnimal,
    getAnimalsFromWorld,
    getAnimalData,
    createFlower,
    getFlowersFromWorld,
    getFlowerData
}