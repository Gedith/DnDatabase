const getCharacterData =  (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT hracskepostavy.Jmeno, `Povolani`, `Rasa`, `Uroven`, `Strength`, `Dexterity`, `Intelligence`, `Charisma`, `Constitution`, `Wisdom`, `Popisek`, `HracskepostavyID`, hracskepostavy.KampaneID, kampane.Nazev, uzivatele.Jmeno AS Username FROM `hracskepostavy` INNER JOIN kampane ON hracskepostavy.KampaneID = kampane.KampaneID INNER JOIN uzivatele ON hracskepostavy.UzivateleID = uzivatele.UzivateleID WHERE HracskepostavyID ="+id, (err, sqlResult) => {
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
                campaignName: sqlResult[0].Nazev,
                username:   sqlResult[0].Username
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

const characterDel = (characterID) => {
    sql.query("DELETE FROM `hracskepostavy` WHERE HracskepostavyID = "+characterID, (err) => {
        if(err) throw err
    })
}

const getSpells = (characterID) => {
    return new Promise ((resolve, reject) => {
        sql.query("SELECT schopnosti.Nazev, schopnosti.Popis, schopnosti.SchopnostiID FROM `schopnosti` WHERE schopnosti.HracskepostavyID = "+characterID, (err, sqlResult) => {
            if(err) throw err
            const spells = []
            sqlResult.forEach(spell => {
              spells.push({
                ID: spell.SchopnostiID,
                name: spell.Nazev,
                description: spell.Popis
              })
            })
            resolve(spells)
        })
    })
}

const createSpell = (name, desc, characterID) => {
    sql.query("INSERT INTO `schopnosti`(`Nazev`, `Popis`, `HracskepostavyID`) VALUES ('"+name+"','"+desc+"','"+characterID+"')", (err) => {
        if(err) throw err
    })
}

const delSpell = (spellID) => {
    sql.query("DELETE FROM `schopnosti` WHERE SchopnostiID = "+spellID, (err) => {
        if(err) throw err
    })
}

module.exports = {
    getCharacterData,
    editCharacter,
    createCharacter,
    getFreeCharacterData,
    characterDel,
    getSpells,
    createSpell,
    delSpell
}