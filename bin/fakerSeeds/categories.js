const { faker } = require("@faker-js/faker");

const categories = (createCategories = () => {
  return [faker.commerce.product()];
});

console.log(categories());
module.exports = categories;
