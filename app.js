const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose');
const ejs = require("ejs");


var user = '';

app.set('view engine', 'ejs')
app.use(express.static("public"))

mongoose.connect("mongodb+srv://chandan:123321123qwe$$S@myquizapp.wb33e.mongodb.net/?retryWrites=true&w=majority/quiz");

const postschema = {
    name: String,
    answers: Number,
    timetaken: Number
}

const Post = mongoose.model("Post", postschema)


app.get("/", function (req, res) {
    res.render("signup");

});

app.post("/", function (req, res) {

    user = req.body.name
    res.redirect("/start")

});
app.get("/start", function (req, res) {
    res.render("start");

});
app.post("/start", function (req, res) {
    var answer = req.body.id;
    var time = req.body.time;

    const post = new Post({
        name: user,
        answers: answer,
        timetaken: time
    });
    post.save(function (err) {

        res.render("bye");
      
    })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("server is live")
});