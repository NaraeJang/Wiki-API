//jshint esversion:6

const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));




//////////MongoDB set up//////////
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {
    useNewUrlParser: true
});

const articleSchema = new mongoose.Schema({
    title: String,
    Content: String
});

const Article = new mongoose.model('Article', articleSchema);





//////////Building a Website starts from here//////////






//////////Port Message//////////
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});