const db = require("../db/connection");

exports.selectEntries = () => {
  return db.query("SELECT * FROM entries").then((res) => {
    return res.rows;
  });
};

exports.addEntry = (newEntry) => {
  return db
    .query("INSERT INTO entries (title, artist, category, status, finished) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [
      newEntry.title,
      newEntry.artist,
      newEntry.category,
      newEntry.status,
      newEntry.finished,
    ])
    .then((res) => {
      return res.rows[0];
    });
};
