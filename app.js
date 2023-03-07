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





//////////Request Targetting All Articles//////////
app.route("/articles")

    .get(function (req, res) {
        Article.find().then(foundArticles => {
            res.send(foundArticles);
        }).catch(error => {
            console.log('found errors while fetching data');
        });
    })

    .post(function (req, res) {

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

    })

    .delete(function (req, res) {
        Article.deleteMany().then(result => {
            res.send("Seccessfully deleted all articles.");
        }).catch(err => {
            console.log(err);
        });
    });


//////////Request Targetting A Specific Article//////////
app.route("/articles/:articleTitle")

    .get((req, res) => {
        Article.findOne({
            title: req.params.articleTitle
        }).then(foundTheArticle => {
                res.send(foundTheArticle);
        }).catch(err => {res.send("No Articles found.")});
    })

    .post((req, res) => {

    })

    .delete((req, res) => {

    });


//////////Port Message//////////
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});