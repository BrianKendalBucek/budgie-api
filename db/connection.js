// const { Pool } = require("pg");

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// const db = new Pool(dbParams);

// db.connect();

// module.exports = db;

// PG connection setup
require("dotenv").config();
const pg = require("pg");

// const client = new pg.Client({
//   connectionString: process.env.DATABASE_URL || "",
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
// });
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new pg.Client({ connectionString });

// console.log(process.env.DATABASE_URL);

client
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
