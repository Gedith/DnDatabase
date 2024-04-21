const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const mysql = require('mysql')


sql = mysql.createConnection({
    host: 'localhost',
    user: 'Gandalf',
    password: 'Gandalf',
    database: 'semestralni_prace'
})

sql.connect((err) => {
    if(err) throw err
    // console.log('Connected to db!')
})

router.get('/', mainController.index)

router.get('/register', mainController.registrationIndex)

router.post('/register', mainController.registrationCreateUser)

router.get('/home', mainController.homePage)

router.get('/logout', mainController.logout)

router.get('/profil', mainController.profil)

router.post('/', mainController.login)

router.get('/profil/changeName', mainController.indexChangeName)

router.post('/profil/changeName', mainController.changeName)

router.get('/profil/changePass', mainController.indexChangePass)

router.post('/profil/changePass', mainController.changePass)

router.get('/profil/deleteProfil', mainController.deleteProfil)

module.exports = router