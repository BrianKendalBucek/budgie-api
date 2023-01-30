const db = require("../connection");

const getAllCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((data) => data.rows);
};

const getAllCategoriesByUser = (userId) => {
  return db
    .query(
      `
    SELECT * FROM categories WHERE user_id = ${userId};
  `
    )
    .then((data) => data.rows);
};

const deleteCategoryById = (categoryId) => {
  return db.query(`
    DELETE FROM categories WHERE id = ${categoryId};
  `);
};

const addCategory = (categoryName, userId) => {
  console.log("quering");
  return db.query(`
    INSERT INTO categories (name, user_id)
    VALUES ('${categoryName}', ${userId} )
    RETURNING id;
  `);
};
module.exports = {
  getAllCategories,
  getAllCategoriesByUser,
  deleteCategoryById,
  addCategory,
};
