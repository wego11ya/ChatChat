const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = 3000;
// handlebars設定
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// 使用body-parser Express.js 要靠 body-parser 來幫忙解析 request body，才能成功把表單資料處理成 req.body
app.use(express.urlencoded({ extended: true }));
// 前後分離的架構下，前後端約定好以 JSON 格式來交換資料
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
