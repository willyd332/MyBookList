const express             = require('express');
const mongoose            = require('mongoose');
const bodyParser          = require('body-parser');
const methodOverride      = require('method-override');
const app                 = express()
require('./db/db.js');
const Book                = require('./models/bookSchema')

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'))


const addBooks = (bookArr, response) => {
  if (bookArr.length >= 2){
    Book.create({
      name: bookArr[0],
      author: bookArr[1]
      }, (err, addedBook) => {
        if (err){
          console.log(err)
        } else {
          bookArr.shift();
          bookArr.shift();
          addBooks(bookArr, response);
        }
        });
  } else {
    response.redirect("/")
  }
}


app.get('/', (req, res) => {
    Book.find({}, (err, foundBooks)=>{
    res.render('index.ejs', {
      books: foundBooks
    })
  })
});

app.get('/new', (req, res) => {
    res.render("new.ejs");
});

app.post('/', (req, res) => {
  const password   = req.body.password;
  const bookArray = req.body.books.split(" - ");
  if (password === "iamwill"){
    addBooks(bookArray, res)
  } else {
    res.redirect("/");
  }
  });



app.listen(process.env.PORT, ()=>{
    console.log("server is go");
})
