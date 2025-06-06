const db = require("./db.js");

const Bracket = function (bracket) {
  this.team1 = bracket.team1;
  this.team2 = bracket.team2;
  this.round = bracket.round;
  this.winner = bracket.winner;
};

Bracket.getAll = (result) => {
  const query = "SELECT * FROM brackets ORDER BY round";
  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching brackets:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Bracket.create = (newBracket, result) => {
  const query = "INSERT INTO brackets SET ?";
  db.query(query, newBracket, (err, res) => {
    if (err) {
      console.error("Error adding bracket:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newBracket });
  });
};

Bracket.updateById = (id, bracket, result) => {
  const query = "UPDATE brackets SET team1 = ?, team2 = ?, round = ?, winner = ? WHERE id = ?";
  db.query(query, [bracket.team1, bracket.team2, bracket.round, bracket.winner, id], (err, res) => {
    if (err) {
      console.error("Error updating bracket:", err);
      result(err, null);
      return;
    }
    result(null, { id, ...bracket });
  });
};

Bracket.deleteById = (id, result) => {
  const query = "DELETE FROM brackets WHERE id = ?";
  db.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error deleting bracket:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Bracket;
