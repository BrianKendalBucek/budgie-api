const { faker } = require("@faker-js/faker");

const currencies = (createCurrencies = () => {
  return [faker.finance.transactionType()];
});

console.log(currencies());
module.exports = currencies;
