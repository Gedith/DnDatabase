const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const mysql = require('mysql')


sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

router.post('/', mainController.login)

module.exports = router