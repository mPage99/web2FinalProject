const sql = require("./db.js");

// Constructor for People
const Person = function (person) {
  this.first_name = person.first_name;
  this.last_name = person.last_name;
  this.address1 = person.address1;
  this.city = person.city;
  this.state = person.state;
  this.zip = person.zip;
  this.team_id = person.team_id;
  this.email = person.email;
  this.phone = person.phone;
  this.password = person.password;
  this.user_name = person.user_name;
  this.person_type = person.person_type; // coach, player, admin
  this.logo_path = person.logo_path || null; // Optional
};

// Create a new Person
Person.create = (newPerson, result) => {
  sql.query("INSERT INTO people SET ?", newPerson, (err, res) => {
    if (err) {
      console.error("Error while creating person: ", err);
      result(err, null);
      return;
    }

    console.log("Created person: ", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};

// Find a Person by ID
Person.findById = (id, result) => {
  sql.query("SELECT * FROM people WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.error("Error while finding person: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found person: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Retrieve all players or coaches
Person.getAllByType = (type, result) => {
  sql.query("SELECT * FROM people WHERE person_type = ?", [type], (err, res) => {
    if (err) {
      console.error("Error while retrieving people: ", err);
      result(err, null);
      return;
    }

    console.log(`${type}s: `, res);
    result(null, res);
  });
};

// Update a Person by ID
Person.updateById = (id, person, result) => {
  sql.query(
    "UPDATE people SET first_name = ?, last_name = ?, address1 = ?, city = ?, state = ?, zip = ?, team_id = ?, email = ?, phone = ?, password = ?, user_name = ?, person_type = ?, logo_path = ? WHERE id = ?",
    [
      person.first_name,
      person.last_name,
      person.address1,
      person.city,
      person.state,
      person.zip,
      person.team_id,
      person.email,
      person.phone,
      person.password,
      person.user_name,
      person.person_type,
      person.logo_path,
      id,
    ],
    (err, res) => {
      if (err) {
        console.error("Error while updating person: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};

// Delete a Person by ID
Person.remove = (id, result) => {
  sql.query("DELETE FROM people WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error("Error while deleting person: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted person with id: ", id);
    result(null, res);
  });
};

// Delete all People
Person.removeAll = (result) => {
  sql.query("DELETE FROM people", (err, res) => {
    if (err) {
      console.error("Error while deleting all people: ", err);
      result(err, null);
      return;
    }

    console.log(`Deleted ${res.affectedRows} people`);
    result(null, res);
  });
};

module.exports = Person;
