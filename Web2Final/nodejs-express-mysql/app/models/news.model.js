const db = require("./db.js");

const News = function (news) {
  this.title = news.title;
  this.content = news.content;
  this.date = news.date;
};

// Fetch all news articles
News.getAll = (result) => {
  const query = "SELECT * FROM news ORDER BY date DESC";
  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching news:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Create a news article
News.create = (newArticle, result) => {
  const query = "INSERT INTO news SET ?";
  db.query(query, newArticle, (err, res) => {
    if (err) {
      console.error("Error creating news article:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newArticle });
  });
};

// Update a news article
News.updateById = (id, article, result) => {
  const query = "UPDATE news SET title = ?, content = ?, date = ? WHERE id = ?";
  db.query(query, [article.title, article.content, article.date, id], (err, res) => {
    if (err) {
      console.error("Error updating news article:", err);
      result(err, null);
      return;
    }
    result(null, { id, ...article });
  });
};

// Delete a news article
News.deleteById = (id, result) => {
  const query = "DELETE FROM news WHERE id = ?";
  db.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error deleting news article:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = News;
