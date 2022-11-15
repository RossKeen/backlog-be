const format = require("pg-format");
const db = require("../connection.js");

const seed = async (data) => {
  const { entriesData } = data;

  await db.query(`DROP TABLE IF EXISTS entries`);

  await db.query(`
  CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    artist VARCHAR DEFAULT 'Unknown' NOT NULL,
    category VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'Never' NOT NULL,
    finished BOOL DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);

  const insertEntriesQueryStr = format(
    "INSERT INTO entries (title, artist, category, status, finished, created_at) VALUES %L RETURNING *;",
    entriesData.map(({ title, artist, category, status, finished, created_at }) => [title, artist, category, status, finished, created_at])
  );

  const entriesPromise = db.query(insertEntriesQueryStr).then((result) => result.rows);

  await entriesPromise;
};

module.exports = seed;
