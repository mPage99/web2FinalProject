const Bracket = require("../models/brackets.model.js");

// Fetch all brackets
exports.getAllBrackets = (req, res) => {
  Bracket.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error fetching brackets" });
    } else {
      res.send(data);
    }
  });
};

// Create a new bracket
exports.createBracket = (req, res) => {
  const newBracket = {
    team1: req.body.team1,
    team2: req.body.team2,
    round: req.body.round,
    winner: req.body.winner,
  };

  Bracket.create(newBracket, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error creating bracket" });
    } else {
      res.send(data);
    }
  });
};

// Update a bracket
exports.updateBracket = (req, res) => {
  const updatedBracket = {
    team1: req.body.team1,
    team2: req.body.team2,
    round: req.body.round,
    winner: req.body.winner,
  };

  Bracket.updateById(req.params.id, updatedBracket, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error updating bracket" });
    } else {
      res.send(data);
    }
  });
};

// Delete a bracket
exports.deleteBracket = (req, res) => {
  Bracket.deleteById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error deleting bracket" });
    } else {
      res.send({ message: "Bracket deleted successfully" });
    }
  });
};
