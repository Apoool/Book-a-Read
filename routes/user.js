const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/library', async(req,res) =>{
  let searchOptions = {}
  if(req.query.title !== null && req.query.title !== ''){
    searchOptions.title = new RegExp(req.query.title, 'i')
  }

  try{
    const books = await Book.find(searchOptions)
    res.render('user/library', {
      books: books,
      searchOptions: req.query
    })
  }catch{
    res.redirect('/library')
  }
});

router.get('/tempAdmin', (req, res) => {
  res.render('user/tempAdmin', {book: new Book()})
})

router.post('/tempAdmin', async(req, res) =>{
  const book = new Book({
    title:req.body.title,
    author:req.body.author,
    summary:req.body.summary,
    rating:req.body.rating
  })
  try{
    const newBook = await book.save()
    res.redirect('/tempAdmin')
  }catch{
    res.render('/library',{
      book: book,
      error: 'book not added'
    })
  }
})
//BOOK ADD
// router.post('/library', async (req,res ) =>{
//   const book = new Book ({
//     title:req.body.title
//   })
//   try{
//     const newBook = await book.save()
//     res.redirect('/library')
//   }catch{
//     res.render('user/library', {
//       book: book,
//       errorMessage: 'Error'
//     })
//   }
// })

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
  res.render('user/about',{title: 'About Us'})
})

router.get('/tempAdmin', (req,res) =>{
  res.render('user/tempAdmin')
})

router.get('/books', (req, res) =>{
  res.render('templates/books',{title:'Books', layout: 'layouts/empty', book})
})

module.exports = router