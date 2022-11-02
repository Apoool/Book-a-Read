if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const db = mongoose.connection

const userRouter = require('./routes/user')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//MongoDB connection setup
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', userRouter)
app.listen(PORT)
console.log('Starting on port: ' + PORT)