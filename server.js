const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("hello~~");
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
