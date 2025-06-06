const News = require("../models/news.model.js");

// Fetch all news
exports.getAllNews = (req, res) => {
  News.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching news" });
    } else {
      res.send(data);
    }
  });
};

// Create a news article
exports.createNews = (req, res) => {
  const newArticle = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  };

  News.create(newArticle, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error creating news article" });
    } else {
      res.send(data);
    }
  });
};

// Update a news article
exports.updateNews = (req, res) => {
  const updatedArticle = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  };

  News.updateById(req.params.id, updatedArticle, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error updating news article" });
    } else {
      res.send(data);
    }
  });
};

// Delete a news article
exports.deleteNews = (req, res) => {
  News.deleteById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting news article" });
    } else {
      res.send({ message: "News article deleted successfully" });
    }
  });
};
