const getCharacterData =  (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT hracskepostavy.HracskepostavyID AS ID, `Jmeno`, `Povolani`, `Rasa`, `Uroven`, hracskepostavy.KampaneID , kampane.Nazev FROM `hracskepostavy` INNER JOIN kampane ON hracskepostavy.KampaneID = kampane.KampaneID WHERE HracskepostavyID = "+id, (err, sqlResult) => {
            if(err) throw err 
            const character = {
                ID: sqlResult[0].ID,
                name: sqlResult[0].Jmeno,
                class: sqlResult[0].Povolani,
                race: sqlResult[0].Rasa,
                level: sqlResult[0].Uroven,
                campaignID: sqlResult[0].KampaneID,
                campaignName: sqlResult[0].Nazev
            }
            resolve(character)
        })
    })    
}

const getFreeCharacterData = (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT hracskepostavy.HracskepostavyID AS ID, `Jmeno`, `Povolani`, `Rasa`, `Uroven`, hracskepostavy.KampaneID FROM `hracskepostavy` WHERE HracskepostavyID = "+id, (err, sqlResult) => {
            if(err) throw err 
            const character = {
                ID: sqlResult[0].ID,
                name: sqlResult[0].Jmeno,
                class: sqlResult[0].Povolani,
                race: sqlResult[0].Rasa,
                level: sqlResult[0].Uroven,
            }
            resolve(character)
        })
    })    
}

const editCharacter = (characterID, characterName, characterClass, characterRace, characterLevel) => {
    sql.query("UPDATE `hracskepostavy` SET `Jmeno`='"+characterName+"',`Povolani`='"+characterClass+"',`Rasa`='"+characterRace+"',`Uroven`='"+characterLevel+"' WHERE HracskepostavyID = "+characterID, (err, sqlResult) =>{
        if(err) throw err
    })
}

const createCharacter = (characterName, characterClass, characterRace, userID) => {
    sql.query("INSERT INTO `hracskepostavy`(`Jmeno`, `Povolani`, `Rasa`, `Uroven`, `UzivateleID`) VALUES ('"+characterName+"','"+characterClass+"','"+characterRace+"',0,"+userID+")", (err, sqlResult) => {
        if(err) throw err
    })
}

module.exports = {
    getCharacterData,
    editCharacter,
    createCharacter,
    getFreeCharacterData
}