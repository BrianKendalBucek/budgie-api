const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");
const cat = [
  "Accommodation",
  "Food",
  "Utilities",
  "Grocery",
  "Clothing",
  "Entertainment",
  "Miscellaneous",
  "Car Insurance",
  "Home Insurance",
  "Life Insurance",
  faker.commerce.product(),
];

const categories = async (sql, seedLength) => {
  for (let i = 0; i < seedLength; i++) {
    const params = [
      faker.datatype.number({ min: 1, max: seedLength }),
      cat[faker.datatype.number({ min: 0, max: cat.length - 1 })],
    ];
    await db.query(sql, params);
  }
};

module.exports = categories;
