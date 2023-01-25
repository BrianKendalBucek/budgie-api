const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");

const categories = async (sql, seedLength) => {
  for (let i = 0; i < 10; i++) {
    const params = [
      faker.datatype.number({ min: 1, max: seedLength }),
      faker.commerce.product(),
    ];
    await db.query(sql, params);
  }
};

module.exports = categories;
