const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const { getUser } = require("./helpers/auth-helpers");
const routes = require("./routes");
const app = express();
const PORT = 3000;
const SESSION_SECRET = "secret";
// handlebars設定
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// 使用body-parser Express.js 要靠 body-parser 來幫忙解析 request body，才能成功把表單資料處理成 req.body
app.use(express.urlencoded({ extended: true }));
// 前後分離的架構下，前後端約定好以 JSON 格式來交換資料
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  res.locals.user = getUser(req);
  next();
});
app.use(routes);
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
