const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {};

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

const db = new Pool(config);

module.exports = db;
