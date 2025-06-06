const { body, validationResult } = require("express-validator");
const teams = require("../controllers/team.controller.js");

module.exports = (app) => {
  const router = require("express").Router();

  // Create a new Team
  router.post(
    "/",
    [
      body("name").exists().withMessage("Name is required").trim().escape(),
      body("coach_id")
        .exists()
        .withMessage("Coach ID is required")
        .isInt()
        .withMessage("Coach ID must be an integer")
        .trim()
        .escape(),
      body("league_id")
        .exists()
        .withMessage("League ID is required")
        .isInt()
        .withMessage("League ID must be an integer")
        .trim()
        .escape(),
      body("notes").exists().withMessage("Notes are required").trim().escape(),
      body("motto").exists().withMessage("Motto is required").trim().escape(),
      body("logo_path").optional().isURL().withMessage("Logo path must be a valid URL").trim().escape(),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    teams.create
  );

  // Retrieve all Teams
  router.get("/", teams.findAll);

  // Retrieve a single Team by ID
  router.get("/:teamId", teams.findOne);

  // Update a Team by ID
  router.put("/:teamId", teams.update);

  // Delete a Team by ID
  router.delete("/:teamId", teams.delete);

  app.use("/api/teams", router);
};
