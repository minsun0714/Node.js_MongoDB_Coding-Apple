const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

var db;
MongoClient.connect(
  "mongodb+srv://jasmine:dlalstjs22!@cluster0.aid8ftu.mongodb.net/?retryWrites=true&w=majority",
  function (error, client) {
    if (error) return console.log(error);

    db = client.db("todoapp");

    app.post("/add", function (req, res) {
      res.send("전송 완료!");
      const toDo = req.body.title;
      const date = req.body.date;
      db.collection("post").insertOne(
        { title: toDo, date: date, _id: Date.now() },
        function (error, res) {
          console.log("저장 완료 ~!~!~!!");
        }
      );
    });

    db.collection("post").insertOne(
      { name: "John", age: 20, _id: 100 },
      function (error, res) {
        console.log("저장 완료 ~!~!~!!");
      }
    );

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/list", function (req, res) {
  res.render("list.ejs");
});

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
