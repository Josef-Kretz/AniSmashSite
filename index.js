const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
const path = require('path')

const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/api')

require('./config/passport')(passport)

connectDB()

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create(mongoose.connection),
        cookie: {
            sameSite: 'Lax'
        }
    })
  );

app.use(passport.initialize())
app.use(passport.session())

app.use('/', mainRoutes)
app.use('/api', apiRoutes)
//https://stackoverflow.com/questions/55289375/redirecting-server-requests-to-index-html-for-react-angular-spa
//let react handle all non-server urls
app.get('*', (req, res) => res.sendFile(path.join(path.dirname(__dirname)+'/public/index.html')))


app.listen(process.env.PORT, () => {
    console.log('Server listening on: ', process.env.PORT || 3001)
})