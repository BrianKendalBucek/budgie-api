const { faker } = require("@faker-js/faker");

const users = () => {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.internet.password(),
    faker.random.numeric(6),
  ];
};

module.exports = users;
