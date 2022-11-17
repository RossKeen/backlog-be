const { selectEntries, addEntry } = require("../models/entries");

exports.getEntries = (req, res, next) => {
  selectEntries().then((entries) => {
    res.status(200).send({ entries });
  });
};

exports.postEntry = (req, res, next) => {
  const newEntry = req.body;
  addEntry(newEntry).then((postedEntry) => {
    res.status(201).send({ postedEntry });
  });
};
