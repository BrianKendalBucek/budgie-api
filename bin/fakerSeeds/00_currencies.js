const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");
const { createCurrencySeed } = require("../seedHelpers");

const currencies = async (random, sql, seedLength) => {
  const seed = createCurrencySeed();
  const date = new Date();
  for (let i = 0; i < seed.length; i++) {
    const params = [seed[i].name, seed[i].code, date, seed[i].rateToUsd];
    await db.query(sql, params);
  }
};

module.exports = currencies;
