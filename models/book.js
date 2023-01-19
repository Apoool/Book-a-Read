const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  summary:{
    type: String,
    required: false
  },
  rating:{
    type: Number,
    min: 1,
    max: 5,
    default: 1
  }
})

module.exports = mongoose.model('Book', bookSchema)