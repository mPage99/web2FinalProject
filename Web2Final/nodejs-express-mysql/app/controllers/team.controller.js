const Team = require("../models/team.model.js");

exports.create = (req, res) => {
  const team = new Team(req.body);

  Team.create(team, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error creating team." });
    } else {
      res.status(201).send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Team.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving teams." });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Team.findById(req.params.teamId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Team not found." });
      } else {
        res.status(500).send({ message: "Error retrieving team." });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  Team.updateById(req.params.teamId, new Team(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Team not found." });
      } else {
        res.status(500).send({ message: "Error updating team." });
      }
    } else {
      res.send({ message: "Team updated successfully." });
    }
  });
};

exports.delete = (req, res) => {
  Team.remove(req.params.teamId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Team not found." });
      } else {
        res.status(500).send({ message: "Error deleting team." });
      }
    } else {
      res.send({ message: "Team deleted successfully." });
    }
  });
};
