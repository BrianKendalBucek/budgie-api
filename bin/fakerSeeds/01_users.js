const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");
const { createCurrencySeed } = require("../seedHelpers");

const users = async (sql, seedLength) => {
  // CURRENCY ID CURRENTLY SET AT CAD, Can be randomly assigned at a later date
  const currencyLength = createCurrencySeed().length;
  for (let i = 0; i < seedLength; i++) {
    const params = [
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email(),
      faker.internet.password(),
      45,
      faker.datatype.number({ min: 500, max: 4000 }),
    ];
    await db.query(sql, params);
  }
};

module.exports = users;
