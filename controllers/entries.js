const { selectEntries } = require("../models/entries");

exports.getEntries = (req, res, next) => {
  selectEntries().then((entries) => {
    res.status(200).send({ entries });
  });
};
