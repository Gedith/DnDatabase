const express = require('express')
const app = express()
const session = require('express-session')
const mainRouters = require('./routes/mainRoutes')
const campaignRouters = require('./routes/campaignRoutes')
const characterRouters = require('./routes/characterRoutes')
const worldRouters = require('./routes/worldRoutes')

app.listen(3000)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('maps'))
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: false
}))

app.use(mainRouters)
app.use(campaignRouters)
app.use(characterRouters)
app.use(worldRouters)

app.use((req, res) => {
    res.status(404).render('404')
})