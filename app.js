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
    content: String
});

const Article = new mongoose.model('Article', articleSchema);





//////////RESTful API: GET(Fetch all the articles)//////////
app.get("/articles", function (req, res) {
    Article.find().then(foundArticles => {
        res.send(foundArticles);
    }).catch(error => {
        console.log('found errors while fetching data');
    });
});




//////////RESTful API: POST(Create one new article)//////////
app.post("/articles", function (req, res) {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function (err) {
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });

});





//////////RESTful API: DELETE//////////
app.delete("/articles", function (req, res) {
    Article.deleteMany().then(result => {
        res.send("Seccessfully deleted all articles.");
    }).catch(err => {
        console.log(err);
    });
});





//////////Port Message//////////
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});