const { faker } = require("@faker-js/faker");

const months = () => {
  // could do logic here to check for current month to make sure insert doesn't go past current month/year combo?
  return [
    faker.datatype.number({ min: 2020, max: 2022 }),
    faker.datatype.number({ min: 1, max: 12 }),
  ];
};

module.exports = months;
