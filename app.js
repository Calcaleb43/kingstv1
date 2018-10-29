var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")
const PORT = process.env.PORT || 5000

mongoose.connect(
  "mongodb://Calcaleb:Cal0505028700@ds213183.mlab.com:13183/cms"
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to db");
});

const cmsRouter = require("./routes/cms-router");
var usersRouter = require("./routes/users");
const indexRouter = require('./routes/index');
const api = require("./api/router").Router;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors())
app.get('/news/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.use('/', indexRouter);
app.use("/cms", cmsRouter);
app.use("/news", cmsRouter);
app.use("/users", usersRouter);


app.get("news.jade");


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;
