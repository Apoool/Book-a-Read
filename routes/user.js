const express = require('express')
const router = express.Router()
const book = require('../models/book')

router.get('/', (req,res) =>{
  res.render('user/home',)
})

router.get('/home', (req,res) =>{
  res.render('user/home')
})

router.get('/library', (req,res) =>{
  res.render('user/library')
})

router.get('/about', (req, res) =>{
  res.render('user/about',{title: 'About Us'})
})

router.get('/books', (req, res) =>{
  res.render('templates/books',{title:'Books', layout: 'layouts/empty', book})
})

module.exports = router