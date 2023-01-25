// PG connection setup
require("dotenv").config();
const pg = require("pg");

/* SHOULD WE USE CLIENT OR POOL? I THINK POOL ACTUALLY, CHECK OUT node-postgres docs 
* it seems that the connection is open and stays open as we aren't actually closing it anywhere...might consider that when refactoring the resetdb script

https://node-postgres.com/features/pooling

*/

// const connectionString =
//   process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new pg.Client({ connectionString });

// client
//   .connect()
//   .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

// module.exports = client;

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const db = new pg.Pool(dbParams);

db.connect();

module.exports = db;
