const express = require("express");
const app = express();
module.exports = app;

app.get("/api", (req, res) => {
  res.send({ hi: "There" });
});
