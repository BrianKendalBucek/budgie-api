const db = require("../connection");

const getAllCategoriesByUser = (userId) => {
  return db.query(`
    SELECT * FROM categories WHERE user_id = ${userId};
  `)
  .then(data => data.rows);
};

module.exports = {
  getAllCategoriesByUser
};