const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");
const { createCurrencySeed } = require("../seedHelpers");

const users = async (sql, seedLength) => {
  const currencyLength = createCurrencySeed().length;
  for (let i = 0; i < seedLength; i++) {
    const params = [
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email(),
      faker.internet.password(),
      faker.datatype.number({ min: 1, max: currencyLength }),
      faker.datatype.number({ min: 500, max: 4000 }),
    ];
    await db.query(sql, params);
  }
};

module.exports = users;
