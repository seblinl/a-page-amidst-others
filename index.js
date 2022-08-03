const express = require("express");
const path = require("path");
const udemyData = require("./public/json/udemy_data.json");
const otherData = require("./public/json/other_data.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/data/udemy", (req, res) => {
  res.send(udemyData);
});
app.get("/data/other", (req, res) => {
  res.send(otherData);
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
