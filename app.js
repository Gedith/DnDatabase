const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10



sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'semestralni_prace'
})

sql.connect((err) => {
    if(err) throw err
    // console.log('Connected!')
})

app.listen(3000)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/register', (req,res) => {
    res.render('registration')
})

app.post('/register', (req,res) => {
    let name = Object.values(req.body)[0]
    let pass = Object.values(req.body)[1]
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        sql.query("INSERT INTO `uzivatele`(`Heslo`, `Jmeno`) VALUES ('"+hash+"','"+name+"')", (err,res) => {
            if(err) throw err
            console.log(res)
        })
    })
    res.render('login')
})

app.post('/', (req,res) => {
    let name = Object.values(req.body)[0]
    let pass = Object.values(req.body)[1]
    sql.query("SELECT Jmeno, Heslo FROM `uzivatele` WHERE Jmeno = '"+name+"'", (err, res) => {
        if(err) throw err
        if(res.length > 0){
            bcrypt.compare(pass, res[0].Heslo, (err, res) => {
                console.log(res)
            })
        } else {
            console.log('Noone was found in the database')
        }
    })
    res.render('login')
})