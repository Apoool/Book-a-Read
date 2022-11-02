const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
  res.render('user/home')
})

router.get('/home', (req,res) =>{
  res.render('user/home')
})

router.get('/library', (req,res) =>{
  res.render('user/library')
})

router.get('/about', (req, res) =>{
  res.render('user/about')
})

module.exports = router