const db = require("../connection");

const getAllUsers = () => {
  return db
    .query(
      `
    SELECT 
       email,
       first_name,
       last_name,
       currency_id,
       monthly_budget
    FROM users;`
    )
    .then((data) => {
      return data.rows;
    });
};

const getUserById = (id) => {
  const sql = `SELECT
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.monthly_budget,
  c.id AS currency_id,
  c.name AS currency_name,
  c.code AS currency_code,
  c.rate_to_usd AS currency_rate_to_usd
FROM users u
JOIN currencies c ON c.id = u.currency_id
WHERE u.id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows[0]);
};

const getUserByEmail = (email) => {
  const sql = `SELECT * FROM users where email=$1;`;
  const params = [email];

  return db.query(sql, params).then((data) => data.rows[0] || null);
};

const createNewUser = (
  first_name,
  last_name,
  password,
  currency_id,
  monthly_budget
) => {
  const sql = `INSERT INTO users(first_name, last_name, email, password, currency_id, monthly_budget) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*;`;
  const params = [first_name, last_name, password, currency_id, monthly_budget];

  return db.query(sql, params).then((data) => data.rows[0]);
};

const authUser = (id) => {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const params = [id];

  return db.query(sql, params).then((data) => data.rows[0] || null);
};
const userLessPassword = (id) => {
  const sql = `SELECT id, first_name, last_name, email, currency_id, monthly_budget FROM users WHERE id=$1`;
  const params = [id];

  return db.query(sql, params).then((data) => data.rows[0] || null);
};

const updateUserCurrency = (id, currency_id) => {
  const sql = `UPDATE users SET currency_id=$1 WHERE id=$2 RETURNING*;`;
  const params = [currency_id, id];

  return db.query(sql, params).then((data) => data.rows[0] || null);
};
const updateUserBudget = (id, budget) => {
  const sql = `UPDATE users SET monthly_budget=$1 WHERE id=$2 RETURNING*;`;
  const params = [budget, id];

  return db.query(sql, params).then((data) => data.rows[0] || null);
};
module.exports = {
  updateUserBudget,
  userLessPassword,
  updateUserCurrency,
  createNewUser,
  authUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
