const sql = require("./db.js");

// Constructor for Team
const Team = function (team) {
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.league_id = team.league_id;
  this.notes = team.notes;
  this.motto = team.motto;
  this.logo_path = team.logo_path || null; // Optional
};

// Create a new Team
Team.create = (newTeam, result) => {
  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.error("Error while creating team: ", err);
      result(err, null);
      return;
    }

    console.log("Created team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};

// Find a Team by ID
Team.findById = (id, result) => {
  sql.query("SELECT * FROM teams WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.error("Error while finding team: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found team: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

// Retrieve all Teams
Team.getAll = (result) => {
  const query = `
    SELECT 
      t.id,
      t.name,
      t.notes,
      t.motto,
      t.logo_path,
      t.league_id,
      c.first_name AS coachName,
      c.phone AS coachPhone,
      c.email AS coachEmail
    FROM teams t
    LEFT JOIN people c ON t.coach_id = c.id
  `;

  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error while retrieving teams:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Update a Team by ID
Team.updateById = (id, team, result) => {
  sql.query(
    "UPDATE teams SET name = ?, coach_id = ?, league_id = ?, notes = ?, motto = ?, logo_path = ? WHERE id = ?",
    [team.name, team.coach_id, team.league_id, team.notes, team.motto, team.logo_path, id],
    (err, res) => {
      if (err) {
        console.error("Error while updating team: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated team: ", { id: id, ...team });
      result(null, { id: id, ...team });
    }
  );
};

// Delete a Team by ID
Team.remove = (id, result) => {
  sql.query("DELETE FROM teams WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error("Error while deleting team: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted team with id: ", id);
    result(null, res);
  });
};

// Delete all Teams
Team.removeAll = (result) => {
  sql.query("DELETE FROM teams", (err, res) => {
    if (err) {
      console.error("Error while deleting all teams: ", err);
      result(err, null);
      return;
    }

    console.log(`Deleted ${res.affectedRows} teams`);
    result(null, res);
  });
};

module.exports = Team;
