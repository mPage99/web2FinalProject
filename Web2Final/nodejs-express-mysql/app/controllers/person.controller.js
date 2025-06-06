const Person = require("../models/person.model.js");
const multer = require("multer");
const path = require("path");

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../uploads"); // Ensure absolute path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Create and Save a new Person
exports.create = (req, res) => {
  const {
    first_name,
    last_name,
    address1,
    city,
    state,
    zip,
    team_id,
    email,
    phone,
    password,
    user_name,
    person_type,
    logo_path,
  } = req.body;

  const person = new Person({
    first_name,
    last_name,
    address1,
    city,
    state,
    zip,
    team_id,
    email,
    phone,
    password,
    user_name,
    person_type,
    logo_path: logo_path || null,
  });

  Person.create(person, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error creating person." });
    } else {
      res.status(201).send(data);
    }
  });
};

// Retrieve all Players
exports.findAllPlayers = (req, res) => {
  Person.getAllByType("player", (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving players." });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Coaches
exports.findAllCoaches = (req, res) => {
  Person.getAllByType("coach", (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving coaches." });
    } else {
      res.send(data);
    }
  });
};

// Retrieve a Single Player by ID
exports.findPlayerById = (req, res) => {
  Person.findById(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Player not found." });
      } else {
        res.status(500).send({ message: "Error retrieving player." });
      }
    } else if (data.person_type !== "player") {
      res.status(400).send({ message: "The requested ID does not belong to a player." });
    } else {
      res.send(data);
    }
  });
};

// Retrieve a Single Coach by ID
exports.findCoachById = (req, res) => {
  Person.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Coach not found." });
      } else {
        res.status(500).send({ message: "Error retrieving coach." });
      }
    } else if (data.person_type !== "coach") {
      res.status(400).send({ message: "The requested ID does not belong to a coach." });
    } else {
      res.send(data);
    }
  });
};

// Update a Person by ID
exports.update = (req, res) => {
  const {
    first_name,
    last_name,
    address1,
    city,
    state,
    zip,
    team_id,
    email,
    phone,
    password,
    user_name,
    person_type,
    logo_path,
  } = req.body;

  Person.updateById(
    req.params.id,
    new Person({
      first_name: first_name || null,
      last_name: last_name || null,
      address1: address1 || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      team_id: team_id || null,
      email: email || null,
      phone: phone || null,
      password: password || null,
      user_name: user_name || null,
      person_type: person_type || null,
      logo_path: logo_path || null,
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({ message: "Person not found." });
        } else {
          res.status(500).send({ message: "Error updating person." });
        }
      } else {
        res.send({ message: "Person updated successfully.", data });
      }
    }
  );
};

// Delete a Person by ID
exports.delete = (req, res) => {
  Person.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Person not found." });
      } else {
        res.status(500).send({ message: "Error deleting person." });
      }
    } else {
      res.send({ message: "Person deleted successfully." });
    }
  });
};

// Upload Player Profile Image
exports.uploadPlayerImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  const logoPath = `/uploads/${req.file.filename}`;

  // Update the player's `logo_path` in the database
  Person.updateById(req.params.id, { logo_path: logoPath }, (err, data) => {
    if (err) {
      console.error("Error while updating player image:", err);
      return res.status(500).send({ message: "Error updating player image." });
    }

    if (!data) {
      return res.status(404).send({ message: "Player not found." });
    }

    // Fetch the updated player data
    Person.findById(req.params.id, (err, updatedPlayer) => {
      if (err || !updatedPlayer) {
        console.error("Error fetching updated player data:", err);
        return res.status(500).send({ message: "Error fetching updated player data." });
      }

      res.send(updatedPlayer); // Return the updated player data
    });
  });
};
