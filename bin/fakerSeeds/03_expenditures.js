const { faker } = require("@faker-js/faker");
const { createCurrencySeed } = require("../seedHelpers");
const db = require("../../db/connection");

const expenditures = async (sql, seedLength) => {
  const currencyLength = createCurrencySeed().length;
  const rates = createCurrencySeed();
  // need to be referenced in route based on user currency
  const cadRate = rates[44].rateToUsd;

  for (let i = 0; i < seedLength; i++) {
    const currencyID = faker.datatype.number({
      min: 0,
      max: currencyLength - 1,
    });
    const rRate = rates[currencyID].rateToUsd;
    const calcRate = Math.round(rRate * (1 / cadRate) * 1e6) / 1e6;

    const params = [
      faker.datatype.number({ min: 1, max: seedLength }),
      currencyID + 1,
      faker.datatype.float({ min: 2, max: 2000, precision: 0.01 }),
      calcRate,
      faker.date.between(faker.date.past(10), faker.date.recent()),
      faker.datatype.number({ min: 1, max: seedLength }),
      faker.commerce.productName(),
    ];
    // console.log(params);

    await db.query(sql, params);
  }
};

module.exports = expenditures;
