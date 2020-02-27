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

    res.render("index.ejs");

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



app.listen(3000, ()=>{
    console.log("server is go");
})
