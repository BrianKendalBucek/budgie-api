// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const db = require("../db/connection");
const prompt = require("prompt-sync")({ sigint: true });

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

const runSeedFiles = async (seedLength = 10) => {
  console.log(`-> Loading Seeds ...${seedLength}`);
  const schemaFilenames = fs.readdirSync("./db/seeds");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    const fileName = fn.replace(".sql", "");
    const queryParams = require(`../bin/fakerSeeds/${fileName}`);
    console.log(`\t-> Running ${fn}`);
    // loop
    for (let i = 0; i < seedLength; i++) {
      fakerArray = queryParams(); // create new user arrays
      await db.query(sql, fakerArray);
    }
  }
};

// control flow
// Run schema?
// Run seeds?
// maybe ask how many times?
const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(
        `-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`
      );
    const schema = prompt("Do you want to run Schema? (y/n)");
    if (schema === "\u0079") {
      await runSchemaFiles();
      console.log("DONE Schema");
    }
    const seeds = prompt("Do you want to run Seeds? (y/n)");
    if (seeds === "\u0079") {
      await runSeedFiles();
      console.log("DONE Seeds");
    }
    console.log("DONE ALL!");
    process.exit();
  } catch (err) {
    console.log(`error: ${err}`);
    process.exit();
  }
};

runResetDB();
