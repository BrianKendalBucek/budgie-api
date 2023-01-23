// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const db = require("../db/connection");

const SEED_LENGTH = 10;

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(`-> Loading Schema Files ...`);
  const schemaFilenames = fs.readdirSync("./db/schema");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, "utf8");
    console.log(`\t-> running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(`-> Loading Seeds ...`);
  const schemaFilenames = fs.readdirSync("./db/seeds");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    const fileName = fn.replace(".sql", "");
    const queryParams = require(`../bin/fakerSeeds/${fileName}`);
    console.log(`\t-> Running ${fn}`);
    // loop
    for (let i = 0; i < SEED_LENGTH; i++) {
      console.log(i);
      fakerArray = queryParams(); // create new user arrays
      console.log(fakerArray);
      await db.query(sql, fakerArray);
    }
  }
};

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(
        `-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`
      );

    await runSchemaFiles();
    await runSeedFiles();
    console.log("DONE!");
    process.exit();
  } catch (err) {
    console.log(`error: ${err}`);
    process.exit();
  }
};

runResetDB();
