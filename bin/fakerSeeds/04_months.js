const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");

const months = async (random, sql, seedLength) => {
  // could do logic here to check for current month to make sure insert doesn't go past current month/year combo?
  // also create more years if needed
  for (let i = 0; i < 12; i++) {
    const params = [2022, i + 1];

    await db.query(sql, params);
  }
};

module.exports = months;
