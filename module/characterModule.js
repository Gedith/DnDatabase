const getCharacterData =  (id) => {
    return new Promise( (resolve, reject) => {
        sql.query("SELECT * FROM hracskepostavy WHERE hracskepostavy.HracskepostavyID = "+id, (err, sqlResult) => {
            if(err) throw err 
            const character = {
                ID: sqlResult[0].HracskepostavyID,
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

module.exports = {
    getCharacterData,
    editCharacter
}