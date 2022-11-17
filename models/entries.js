const db = require("../db/connection");

exports.selectEntries = () => {
  return db.query("SELECT * FROM entries").then((res) => {
    return res.rows;
  });
};
