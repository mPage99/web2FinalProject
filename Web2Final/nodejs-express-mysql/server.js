// used for building the Rest apis
const express = require("express");
const cors = require("cors");

// parse the data for validation
const bodyParser = require("body-parser");

// create an express app
const app = express();

const router = express.Router();

app.use(bodyParser.json());

//app.use(expressValidator()); // deprecated
app.use("/api", router);

app.use(cors({ origin: "http://localhost:3000" }));

// routes
require("./app/routes/player.routes.js")(app);
require("./app/routes/coach.routes.js")(app);
require("./app/routes/team.routes.js")(app);
const bracketsRoutes = require("./app/routes/brackets.routes.js");
//require("./app/routes/brackets.routes")(app);
//require("./app/routes/events.routes.js")(app);
const eventsRoutes = require("./app/routes/events.routes.js");
app.use("/api/events", eventsRoutes); // Attach events routes
app.use("/api/brackets", bracketsRoutes); // Attach brackets routes

const newsRoutes = require("./app/routes/news.routes");
app.use("/api/news", newsRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
