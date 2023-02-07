const { faker } = require("@faker-js/faker");
const db = require("../../db/connection");

const categories = async (random, sql, seedLength) => {
  if (random) {
    for (let i = 0; i < seedLength; i++) {
      const params = [
        faker.datatype.number({ min: 1, max: seedLength }),
        faker.commerce.product(),
    ];
    await db.query(sql, params);
  }
} else {
  const params = [
    [1, 'toys'],
    [1, 'beer'],
    [1, 'yarn'],
    [2, 'hoodies'],
    [2, 'hats'],
    [2, 'childcare'],
    [3, 'tropical paradise things']
  ];
  for (let param of params) {
    await db.query(sql, param);
  }
}
};

module.exports = categories;
