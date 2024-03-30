const getWorldName = (worldID) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT svety.JmenoSveta FROM `svety` WHERE svety.SvetyID = "+worldID, (err, sqlResult) => {
            if(err) throw err
            resolve(sqlResult[0].JmenoSveta)
        })
    })
}

module.exports = {
    getWorldName
}