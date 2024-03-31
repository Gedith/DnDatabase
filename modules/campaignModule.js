const getAvailablePlayers = (campaignID) => {
    return new Promise((resolve, reject) => {
        const characters = []
        sql.query("SELECT hracskepostavy.Jmeno, uzivatele.Jmeno AS username FROM hracskepostavy INNER JOIN uzivatele ON hracskepostavy.UzivateleID = uzivatele.UzivateleID WHERE Hracskepostavy.KampaneID IS NULL", (err, sqlResult) => {
            if(err) reject(err)
            sqlResult.forEach((element) => {
              characters.push({
                characterName: element.Jmeno,
                username: element.username
              })
            })
            resolve(characters)
        })
    })
}

const getCampaignData = (campaignID) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT kampane.Nazev FROM `kampane` WHERE KampaneID = "+campaignID, (err, sqlResult) => {
      resolve(sqlResult[0].Nazev)
    })
  })
}

const getPlayerCharactersFromCampaign = (campaignID) => {
  return new Promise((resolve, reject) => {
    const characters = []
    sql.query("SELECT HracskepostavyID, hracskepostavy.Jmeno AS characterName FROM `hracskepostavy` WHERE hracskepostavy.KampaneID = "+campaignID, (err, sqlResult) => {
      sqlResult.forEach((character) => {
        characters.push({
          characterID: character.HracskepostavyID,
          characterName: character.characterName
        })
      })
      resolve(characters)
    })
  })
}

const addPlayerToCampaign = (characterName, campaignID) => {
  sql.query("UPDATE `hracskepostavy` SET `KampaneID`='"+campaignID+"' WHERE hracskepostavy.Jmeno = '"+characterName+"'", (err) => {
    if(err) throw err
  })
}

const createCampaign = (campaignName, userID) => {
  sql.query("INSERT INTO `kampane`(`Nazev`, `UzivateleID`) VALUES ('"+campaignName+"','"+userID+"')", (err, sqlResult) => {
    if(err) throw err
})
}

const createWorld = (worldName, campaignID) => {
  sql.query("INSERT INTO `svety`(`JmenoSveta`, `KampaneID`) VALUES ('"+worldName+"','"+campaignID+"')", (err, sqlResult) => {
    if(err) throw err
  })
}

const getWorlds = (campaignID) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT svety.JmenoSveta, svety.SvetyID FROM `svety` WHERE svety.KampaneID = "+campaignID, (err, sqlResult) => {
      const svety = []
      if(err) throw err
      sqlResult.forEach((svet) => {
        svety.push({
          ID: svet.SvetyID,
          name: svet.JmenoSveta
        })
      })
      resolve(svety)
    })
  })
}

module.exports = {
    getAvailablePlayers,
    addPlayerToCampaign,
    getPlayerCharactersFromCampaign,
    createCampaign,
    createWorld,
    getWorlds,
    getCampaignData
}