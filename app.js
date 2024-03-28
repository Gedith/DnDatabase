const express = require('express')
const app = express()
const session = require('express-session')
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
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}))

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
        if(err) throw err
        sql.query("INSERT INTO `uzivatele`(`Heslo`, `Jmeno`) VALUES ('"+hash+"','"+name+"')", (err,res) => {
            if(err) throw err
            console.log(res)
        })
    })
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('login')
})

app.post('/', (req,res) => {
    let name = Object.values(req.body)[0]
    let pass = Object.values(req.body)[1]
    sql.query("SELECT Jmeno, Heslo FROM `uzivatele` WHERE Jmeno = '"+name+"'", (err, sqlResult) => {
        if(err) throw err
        if(sqlResult.length > 0){
            bcrypt.compare(pass, sqlResult[0].Heslo, (err, compare) => {
                if(compare == true){
                    req.session.userName = name
                    res.render('home', { userName: req.session.userName })
                } else {
                    console.log('Wrong password')
                    res.render('login')
                }
            })
        } else {
            console.log('Noone was found in the database')
            res.render('login')
        }
    })
})