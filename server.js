const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

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
      db.collection("counter").findOne(
        { name: "게시물 갯수" },
        (error, result) => {
          let totalPosts = result.totalPost;

          db.collection("post").insertOne(
            { title: toDo, date: date, _id: totalPosts + 1 },
            function (error, res) {
              console.log("저장 완료!");
              db.collection("counter").updateOne(
                { name: "게시물 갯수" },
                { $inc: { totalPost: 1 } },
                function (error, result) {
                  if (error) console.log(error);
                }
              );
            }
          );
        }
      );
    });

    app.get("/list", function (req, response) {
      db.collection("post")
        .find()
        .toArray(function (error, result) {
          console.log("가져왔다~!");
          console.log(result);
          response.render("list.ejs", { posts: result });
        });
    });
  }
);

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/pet", function (req, res) {
  res.send("pet용품 쇼핑할 수 있는 페이지입니다용~~");
});

app.get("/beauty", function (req, res) {
  res.send("beauty용품 쇼핑할 수 있는 페이지입니다용~~");
});

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/write", function (req, res) {
  res.render("write.ejs");
});

app.delete("/delete", function (req, response) {
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, function (error, result) {
    console.log("삭제 완료");
    response.status(200).send({
      message: "성공했슴당~",
    });
  });
});

app.get("/detail/:id", function (req, response) {
  db.collection("post").findOne(
    { _id: Number(req.params.id) },
    function (error, result) {
      console.log(result);
      response.render("detail.ejs", { data: result });
    }
  );
});
