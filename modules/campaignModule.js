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

module.exports = {
    getAvailablePlayers,
    addPlayerToCampaign,
    getPlayerCharactersFromCampaign,
    createCampaign
}