const { faker } = require("@faker-js/faker");

const users = () => {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

module.exports = users;
