const { faker } = require("@faker-js/faker");
const { randomNumBetween } = require("../seedHelpers");

const categories = (seedLength) => {
  return [randomNumBetween(1, seedLength), faker.commerce.product()];
};

module.exports = categories;
