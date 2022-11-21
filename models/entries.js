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

exports.changeEntry = (entry_id, status) => {
  let finished = false;
  if (status === "Completed" || status === "100%" || status === "Always" || status === "Quit") {
    finished = true;
  }
  return db.query("UPDATE entries SET status = $1, finished = $2 WHERE id = $3 RETURNING *;", [status, finished, entry_id]).then((res) => {
    return res.rows[0];
  });
};
