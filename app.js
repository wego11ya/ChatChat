const express = require("express");
// Socket.io Initialization
const { createServer } = require("http");
const { Server } = require("socket.io");

const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const { getUser } = require("./helpers/auth-helpers");
const routes = require("./routes");
const app = express();
// Socket.io Initialization
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 3000;
const SESSION_SECRET = "secret";

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
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
httpServer.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
