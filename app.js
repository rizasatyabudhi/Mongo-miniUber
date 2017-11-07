const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/miniUber");
}

///////// MIDDLEWARES //////////
// bodyParser middleware must be placed before routes(app)
// the placement determines the sequence of middleware that will be called
app.use(bodyParser.json());
routes(app);

// next must be called from the previous middleware
// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});
///////// MIDDLEWARES //////////

module.exports = app;
