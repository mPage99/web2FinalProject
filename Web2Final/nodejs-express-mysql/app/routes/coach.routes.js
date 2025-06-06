const { body, validationResult } = require("express-validator");
const persons = require("../controllers/person.controller.js");

module.exports = (app) => {
  const router = require("express").Router();

  // Create a new Coach with validation and sanitization
  router.post(
    "/",
    [
      body("first_name")
        .exists()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long")
        .trim()
        .escape(),
      body("last_name")
        .exists()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long")
        .trim()
        .escape(),
      body("address1")
        .exists()
        .withMessage("Address is required")
        .isLength({ min: 5 })
        .withMessage("Address must be at least 5 characters long")
        .trim()
        .escape(),
      body("city")
        .exists()
        .withMessage("City is required")
        .isLength({ min: 2 })
        .withMessage("City must be at least 2 characters long")
        .trim()
        .escape(),
      body("state")
        .exists()
        .withMessage("State is required")
        .isLength({ min: 2, max: 2 })
        .withMessage("State must be exactly 2 characters long")
        .trim()
        .escape(),
      body("zip")
        .exists()
        .withMessage("ZIP code is required")
        .isPostalCode("US")
        .withMessage("ZIP code must be valid")
        .trim()
        .escape(),
      body("team_id")
        .exists()
        .withMessage("Team ID is required")
        .isInt()
        .withMessage("Team ID must be an integer")
        .trim()
        .escape(),
      body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid")
        .trim()
        .escape(),
      body("phone")
        .exists()
        .withMessage("Phone number is required")
        .isMobilePhone("en-US")
        .withMessage("Phone number must be valid")
        .trim()
        .escape(),
      body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim()
        .escape(),
      body("user_name")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .trim()
        .escape(),
      body("person_type")
        .exists()
        .withMessage("Person type is required")
        .equals("coach")
        .withMessage("Person type must be 'coach'")
        .trim()
        .escape(),
      body("logo_path").optional().isURL().withMessage("Logo path must be a valid URL").trim().escape(),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next(); // Pass control to the controller if validation passes
    },
    persons.create
  );

  // Retrieve all Coaches
  router.get("/", persons.findAllCoaches);

  // Retrieve a single Coach by ID
  router.get("/:id", persons.findCoachById);

  // Update a Coach by ID
  router.put("/:id", persons.update);

  // Delete a Coach by ID
  router.delete("/:id", persons.delete);

  app.use("/api/coaches", router);
};
