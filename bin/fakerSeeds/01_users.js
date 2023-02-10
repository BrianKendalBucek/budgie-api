const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");
const { createCurrencySeed } = require("../seedHelpers");

const users = async (random, sql, seedLength) => {
  if (random) {
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
  } else {
    const params = [
      ['Bryce', ' Haley', 'bh@mail.ca', '1234', 45, 1000],
      ['Gord', 'Letkeman', 'gl@mail.ca', '1234', 45, 5000],
      ['Matt', 'Davis', 'md@mail.ca', '1234', 45, 2500],
      ['Brian', 'Bucek', 'bb@mail.ca','1234', 45, 3000]
    ];
    for (let param of params) {
      await db.query(sql, param);
    }
  }

};

module.exports = users;
