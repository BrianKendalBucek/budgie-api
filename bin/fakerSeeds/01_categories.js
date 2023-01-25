const { faker } = require("@faker-js/faker");

const categories = (seedLength) => {
  return [
    faker.datatype.number({ min: 1, max: seedLength }),
    faker.commerce.product(),
  ];
};

module.exports = categories;
