const { faker } = require("@faker-js/faker");
const { createCurrencySeed } = require("../seedHelpers");
const db = require("../../db/connection");

const expenditures = async (random, sql, seedLength) => {
  const currencyLength = createCurrencySeed().length;
  const rates = createCurrencySeed();
  // need to be referenced in route based on user currency
  const cadRate = rates[44].rateToUsd;
  if (random) {
    for (let i = 0; i < seedLength; i++) {
      const currencyID = faker.datatype.number({
        min: 0,
        max: currencyLength - 1,
      });
      const rRate = rates[currencyID].rateToUsd;
      const calcRate = Math.round(rRate * (1 / cadRate) * 1e6) / 1e6;

      const params = [
        faker.datatype.number({ min: 1, max: seedLength }),
        currencyID + 1,
        faker.datatype.float({ min: 2, max: 2000, precision: 0.01 }),
        calcRate,
        faker.date.between(faker.date.past(10), faker.date.recent()),
        faker.datatype.number({ min: 1, max: seedLength }),
        faker.commerce.productName(),
      ];
    await db.query(sql, params);
  }
} else {
  params = [
    [1, 70, 1509.64, 8.402993, faker.date.between(faker.date.past(10), faker.date.recent()), 1, "hot wheels"],
    [1, 94, 96.27, 0.603959, faker.date.between(faker.date.past(10), faker.date.recent()), 1, "my little pony area rug"],
    [1, 11, 81.96, 376.54999, faker.date.between(faker.date.past(10), faker.date.recent()), 2, "twin city radler"],
    [2, 70, 1509.64, 8.402993, faker.date.between(faker.date.past(10), faker.date.recent()), 4, "black hoodie"],
    [2, 94, 96.27, 0.603959, faker.date.between(faker.date.past(10), faker.date.recent()), 4, "grey hoodie"],
    [2, 11, 81.96, 376.54999, faker.date.between(faker.date.past(10), faker.date.recent()), 5, "coding hat"],
    [3, 209, 1846.65, 1.030769, faker.date.between(faker.date.past(10), faker.date.recent()), 6, "beach towels"],
    [3, 76, 152.7, 1.030769, faker.date.between(faker.date.past(10), faker.date.recent()), 6, "tequila"],
    [3, 202, 970.5, 1.030769, faker.date.between(faker.date.past(10), faker.date.recent()), 6, "sunscreen"],
    [3, 142, 1.1, 1138.97871, faker.date.between(faker.date.past(10), faker.date.recent()), 6, "fruit plate"]
  ];
  for (let param of params) {
    await db.query(sql, param);
  }
}
};

module.exports = expenditures;
