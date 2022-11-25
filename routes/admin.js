const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.use((req, res, next) => {
  req.app.set('layout', 'layouts/empty');
  next();
});

//Shows all books
router.get('/', async (req, res) =>{
  let searchOptions = {}
  if(req.query.title !== null && req.query.title !== '') {
    searchOptions.title = new RegExp(req.query.title, 'i')
  }

  try{
    const books = await Book.find(searchOptions)
    res.render('templates/books', {
      books: books, 
      searchOptions: req.query
    })
  }catch{
    res.redirect('/admin')
  }
  
})
router.get('/test', (req,res) =>{
  res.render('templates/test',{book: new Book()})
})

router.post('/', async (req, res) =>{
  const book = new Book({
    title: req.body.title
  })
  try{
    const newBook = await book.save()
    //res.redirect(`book/$(newBook.id)`)  
    res.redirect('/admin')
  }catch{
    res.render('templates/test',{
      book: book,
      errorMessage: 'Error creating book'
    })
  }
})

module.exports = router