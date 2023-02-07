const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://jasmine:dlalstjs22!@cluster0.aid8ftu.mongodb.net/?retryWrites=true&w=majority",
  function (error, client) {
    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/pet", function (req, res) {
  res.send("pet용품 쇼핑할 수 있는 페이지입니다용~~");
});

app.get("/beauty", function (req, res) {
  res.send("beauty용품 쇼핑할 수 있는 페이지입니다용~~");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", function (req, res) {
  res.send("전송 완료!");
  console.log(req.body.title);
  console.log(req.body.date);
});
