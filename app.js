const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/miniUber");

// bodyParser middleware must be placed before routes(app)
app.use(bodyParser.json());
routes(app);

module.exports = app;
