const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");

const users = async (sql, seedLength) => {
  for (let i = 0; i < seedLength; i++) {
    const params = [
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email(),
      faker.internet.password(),
      faker.datatype.number({ min: 1, max: 272 }),
      faker.datatype.number({ min: 500, max: 4000 }),
    ];
    await db.query(sql, params);
  }
};

module.exports = users;
