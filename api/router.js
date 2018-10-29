const Router = require("express").Router();
const NewCtrl = require("./controller");

Router.get("/news", NewCtrl.getNews);
Router.post("/news", NewCtrl.saveNews);
module.exports = {
  Router: Router
};
