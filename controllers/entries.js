const { selectEntries, addEntry, changeEntry } = require("../models/entries");

exports.getEntries = (req, res, next) => {
  selectEntries().then((entries) => {
    res.status(200).send({ entries });
  });
};

exports.postEntry = (req, res, next) => {
  const newEntry = req.body;
  addEntry(newEntry)
    .then((postedEntry) => {
      res.status(201).send({ postedEntry });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchEntry = (req, res, next) => {
  const { params, body } = req;
  const { entry_id } = params;
  const { status } = body;
  changeEntry(entry_id, status)
    .then((patchedEntry) => {
      res.status(200).send({ patchedEntry });
    })
    .catch((err) => {
      next(err);
    });
};
