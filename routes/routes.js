const DriversController = require("../controllers/drivers_controller");

module.exports = app => {
  app.get("/api", DriversController.greetings);
  app.post("/api/drivers", DriversController.create);

  // to detect which driver is edited, we pass it in the URL,
  // rather than request in in the body
  app.put("/api/drivers/:id", DriversController.edit);
  app.delete("/api/drivers/:id", DriversController.delete);
  app.get("/api/drivers", DriversController.index);
};
