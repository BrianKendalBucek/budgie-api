const { faker } = require("@faker-js/faker");

const users = (createUsers = () => {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
});

console.log(users());
module.exports = users;
