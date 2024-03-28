const express = require('express')
const app = express()
const session = require('express-session')
const mainRouters = require('./routes/mainRoutes')
const campaignController = require('./routes/campaignRoutes')

app.listen(3000)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: false
}))

app.use(mainRouters)
app.use(campaignController)