const db = require("../connection");

const getAllCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((data) => data.rows);
};

const getAllCategoriesByUser = (userId) => {
  const sql = `SELECT * FROM categories WHERE user_id=$1;`;
  const params = [userId];
  return db.query(sql, params).then((data) => data.rows);
};

const deleteCategoryById = (categoryId) => {
  const sql = `DELETE FROM categories WHERE id=$1;`;
  const params = [categoryId];
  return db.query(sql, params);
};

const addCategory = (categoryName, id) => {
  const sql = `INSERT INTO categories (name, user_id)
  VALUES ($1, $2 ) RETURNING*;`;
  const params = [categoryName, id];
  return db.query(sql, params);
};
module.exports = {
  getAllCategories,
  getAllCategoriesByUser,
  deleteCategoryById,
  addCategory,
};
