const Driver = require("../models/driver");

module.exports = {
  greetings(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      // whenever there is an error, "next" will be called
      // and pass the error to the next middleware
      .catch(next);
  },

  edit(req, res, next) {
    // to get the id from the URL :id
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps).then(() => {
      // we need to find the driver that has just being updated
      Driver.findById({ _id: driverId })
        .then(driver => res.send(driver))
        .catch(next);
    });
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.findByIdAndRemove({ _id: driverId }).then(driver => {
      res
        .status(204)
        .send(driver)
        .catch(next);
    });
  },
  driverList(req, res, next) {
    Driver.find({})
      .sort({ email: "desc" })
      .then(drivers => {
        res.send({ drivers: drivers }).catch(next);
      });
  },
  index(req, res, next) {
    // req.query = to get the query string from url
    const { lng, lat } = req.query;
    Driver.geoNear(
      // we need to use parseFloat because the lng&lat from url query is a STRING,
      // while what we need is Integer
      { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
      // maxDistance = in meters
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  }
};
