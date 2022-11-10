const format = require("pg-format");
const db = require("../connection.js");

const seed = async (data) => {
  const { gamesData, filmsData, booksData } = data;

  await db.query(`DROP TABLE IF EXISTS games`);
  await db.query(`DROP TABLE IF EXISTS films`);
  await db.query(`DROP TABLE IF EXISTS books`);

  await db.query(`
  CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    game_title VARCHAR NOT NULL,
    category VARCHAR DEFAULT 'Game' NOT NULL,
    status VARCHAR DEFAULT 'Not played' NOT NULL,
    finished BOOL DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`
  CREATE TABLE films (
    film_id SERIAL PRIMARY KEY,
    film_title VARCHAR NOT NULL,
    director VARCHAR DEFAULT 'Unknown',
    category VARCHAR DEFAULT 'Film' NOT NULL,
    status VARCHAR DEFAULT 'Not watched' NOT NULL,
    finished BOOL DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`
  CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    book_title VARCHAR NOT NULL,
    author VARCHAR DEFAULT 'Unknown',
    category VARCHAR DEFAULT 'Book',
    status VARCHAR DEFAULT 'Not read' NOT NULL,
    finished BOOL DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);

  const insertGamesQueryStr = format(
    "INSERT INTO games (game_title, category, status, finished, created_at) VALUES %L RETURNING *;",
    gamesData.map(({ title, category, status, finished, created_at }) => [title, category, status, finished, created_at])
  );

  const insertFilmsQueryStr = format(
    "INSERT INTO films (film_title, director, category, status, finished, created_at) VALUES %L RETURNING *;",
    filmsData.map(({ title, director, category, status, finished, created_at }) => [title, director, category, status, finished, created_at])
  );

  const insertBooksQueryStr = format(
    "INSERT INTO books (book_title, author, category, status, finished, created_at) VALUES %L RETURNING *;",
    filmsData.map(({ title, author, category, status, finished, created_at }) => [title, author, category, status, finished, created_at])
  );

  const gamesPromise = db.query(insertGamesQueryStr).then((result) => result.rows);
  const filmsPromise = db.query(insertFilmsQueryStr).then((result) => result.rows);
  const booksPromise = db.query(insertBooksQueryStr).then((result) => result.rows);

  await Promise.all([gamesPromise, filmsPromise, booksPromise]);
};

module.exports = seed;
