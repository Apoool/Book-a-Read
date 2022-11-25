if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const db = mongoose.connection

const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//MongoDB connection setup
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', userRouter)
app.use('/admin', adminRouter)

try{
  app.listen(PORT)
  console.log('Starting on port: ' + PORT)
}catch{
  console.log('Monggo Error')
}