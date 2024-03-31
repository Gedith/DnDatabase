const getCharacterData =  (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT `Jmeno`, `Povolani`, `Rasa`, `Uroven`, `Strength`, `Dexterity`, `Intelligence`, `Charisma`, `Constitution`, `Wisdom`, `Popisek`, `HracskepostavyID`, hracskepostavy.KampaneID, kampane.Nazev FROM `hracskepostavy` INNER JOIN kampane ON hracskepostavy.KampaneID = kampane.KampaneID WHERE HracskepostavyID = "+id, (err, sqlResult) => {
            if(err) throw err 
            const character = {
                ID: sqlResult[0].HracskepostavyID,
                name: sqlResult[0].Jmeno,
                class: sqlResult[0].Povolani,
                race: sqlResult[0].Rasa,
                level: sqlResult[0].Uroven,
                str: sqlResult[0].Strength,
                dex: sqlResult[0].Dexterity,
                int: sqlResult[0].Intelligence,
                cha: sqlResult[0].Charisma,
                con: sqlResult[0].Constitution,
                wis: sqlResult[0].Wisdom,
                desc: sqlResult[0].Popisek,
                campaignID: sqlResult[0].KampaneID,
                campaignName: sqlResult[0].Nazev
            }
            resolve(character)
        })
    })    
}

const getFreeCharacterData = (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT hracskepostavy.HracskepostavyID AS ID, `Jmeno`, `Povolani`, `Rasa`, `Uroven`, `Strength`, `Dexterity`, `Intelligence`, `Charisma`, `Constitution`, `Wisdom`, `Popisek`, hracskepostavy.KampaneID FROM `hracskepostavy` WHERE HracskepostavyID = "+id, (err, sqlResult) => {
            if(err) throw err 
            const character = {
                ID: sqlResult[0].ID,
                name: sqlResult[0].Jmeno,
                class: sqlResult[0].Povolani,
                race: sqlResult[0].Rasa,
                level: sqlResult[0].Uroven,
                str: sqlResult[0].Strength,
                dex: sqlResult[0].Dexterity,
                int: sqlResult[0].Intelligence,
                cha: sqlResult[0].Charisma,
                con: sqlResult[0].Constitution,
                wis: sqlResult[0].Wisdom,
                desc: sqlResult[0].Popisek,
            }
            resolve(character)
        })
    })    
}

const editCharacter = (characterID, characterName, characterClass, characterRace, characterLevel, str, dex, int, cha, con, wis, desc) => {
    sql.query("UPDATE `hracskepostavy` SET `Jmeno`='"+characterName+"',`Povolani`='"+characterClass+"',`Rasa`='"+characterRace+"',`Uroven`='"+characterLevel+"',`Strength`='"+str+"',`Dexterity`='"+dex+"',`Intelligence`='"+int+"',`Charisma`='"+cha+"',`Constitution`='"+con+"',`Wisdom`='"+wis+"',`Popisek`='"+desc+"' WHERE HracskepostavyID = "+characterID, (err, sqlResult) =>{
        if(err) throw err
    })
}

const createCharacter = (characterName, characterClass, characterRace, str, dex, int, cha, con, wis, userID) => {
    sql.query("INSERT INTO `hracskepostavy`(`Jmeno`, `Povolani`, `Rasa`, `Uroven`, Strength, Dexterity, Intelligence, Charisma, Constitution, Wisdom, `UzivateleID`) VALUES ('"+characterName+"','"+characterClass+"','"+characterRace+"',0,"+str+", "+dex+", "+int+", "+cha+", "+con+", "+wis+","+userID+")", (err, sqlResult) => {
        if(err) throw err
    })
}

module.exports = {
    getCharacterData,
    editCharacter,
    createCharacter,
    getFreeCharacterData
}