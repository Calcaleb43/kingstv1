const NewsModel = require("./model");

const newCtrl = {};

newCtrl.getNews = function(req, res, next) {
  NewsModel.find({})
    .then(news => {
      res.json(news);
    })
    .catch(err => {
      res.status(500).json({ code: "error" });
    });
};

newCtrl.saveNews = function(req, res, next) {
  const body = req.body;
  console.log("req body is ", body);
  const newModel = new NewsModel(body);
  newModel
    .save()
    .then(savedNews => {
      res.json(savedNews);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = newCtrl;
