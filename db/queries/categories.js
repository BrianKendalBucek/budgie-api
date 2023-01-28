const db = require("../connection");

const getAllCategoriesByUser = (userId) => {
  return db.query(`
    SELECT * FROM categories WHERE user_id = ${userId};
  `)
  .then(data => data.rows);
};

const deleteCategoryById = (categoryId) => {
  return db.query(`
    DELETE FROM categories WHERE id = ${categoryId};
  `)
};

module.exports = {
  getAllCategoriesByUser,
  deleteCategoryById
};