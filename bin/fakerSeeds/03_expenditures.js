const { faker } = require("@faker-js/faker");
const { createCurrencySeed } = require("../seedHelpers");
const db = require("../../db/connection");

const expenditures = async (sql, seedLength) => {
  const currencyLength = createCurrencySeed().length;
  const rates = createCurrencySeed();

  for (let i = 0; i < seedLength; i++) {
    const currencyID = faker.datatype.number({ min: 1, max: currencyLength });
    const rRate = rates[currencyID].rateToUsd;
    const params = [
      faker.datatype.number({ min: 1, max: seedLength }),
      currencyID,
      +faker.commerce.price(2, 1000, 2),
      rRate,
      faker.date.between(faker.date.past(10), faker.date.recent()),
      faker.datatype.number({ min: 1, max: seedLength }),
      faker.commerce.productName(),
    ];

    await db.query(sql, params);
  }
};

module.exports = expenditures;
