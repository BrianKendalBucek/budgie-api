const { faker } = require("@faker-js/faker");

const categories = () => {
  return [faker.commerce.product()];
};

module.exports = categories;
