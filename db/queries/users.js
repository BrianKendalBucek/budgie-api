const db = require('../connection');

const getAllUsers = () => {
  return db.query(`
    SELECT 
       email,
       first_name,
       last_name,
       currency_id,
       monthly_budget
    FROM users;`)
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  return db.query(`
    SELECT
      u.email,
      u.first_name,
      u.last_name,
      u.monthly_dudget
      c.name AS currency_name
      c.code AS currency_code
      c.rate_to_usd AS currency_rate_to_usd
    FROM users u
    JOIN currency c ON c.id = u.currency_id
    WHERE u.id = ${id};
  `)
};

module.exports = {
  getAllUsers,
  getUserById
};
