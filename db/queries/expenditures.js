const db = require("../connection");

//#FrontendFreshmen

//query to grab all expenses associated with a dude
const getAllExpendituresByUserId = (id) => {
  const sql = `SELECT * FROM expenditures WHERE user_id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const orderExpendituresDate = (id) => {
  const sql = `SELECT * FROM expenditures WHERE user_id=$1 GROUP BY id ORDER BY date_paid desc;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const getAllExpenditures = () => {
  return db.query(`SELECT * FROM expenditures;`).then((data) => data.rows);
};

const getAllExpendituresByUserIdJoinCurrencies = (id) => {
  const sql = `SELECT e.id as ex_id, e.user_id, e.currency_id as paid_in_curr_id, e.cost, e.exchange_rate_base, TO_CHAR(e.date_paid :: DATE, 'yyyy/mm/dd') as date_paid, e.category_id, e.notes, c.id as curr_id, c.name as curr_name, c.code as code, c.rate_to_usd  FROM expenditures e JOIN currencies c ON e.currency_id=c.id WHERE user_id=$1 ORDER BY e.id DESC;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const getOneExpenditureById = (id) => {
  const sql = `SELECT * FROM expenditures WHERE id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows);
};

const createNewExpenditure = (
  currency_id,
  cost,
  date_paid,
  categoryId,
  notes,
  userId
) => {
  return db
    .query(
      `SELECT TRUNC(user_c.rate_to_usd * ( 1 / expense_c.rate_to_usd), 6) AS exchange_rate_base 
                      FROM users u 
                        JOIN currencies user_c ON u.id = $1 AND u.currency_id = user_c.id 
                        JOIN currencies expense_c ON expense_c.id = $2;`,
      [userId, currency_id]
    )
    .then((data) => {
      exchange_rate_base = data.rows[0].exchange_rate_base;
      const sql = `INSERT INTO expenditures(user_id, currency_id, cost, exchange_rate_base, date_paid, category_id, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
      params = [
        userId,
        currency_id,
        cost,
        exchange_rate_base,
        date_paid,
        categoryId,
        notes,
      ];
      db.query(sql, params).then((data) => {
        data.rows[0];
      });
    });
};

const deleteExpenditureById = (id) => {
  const sql = `DELETE FROM expenditures WHERE id=$1`;
  const params = [id];
  return db.query(sql, params).then((data) => data);
};

const getTotalPerDay = (userId) => {
  const sql = `SELECT
  SUM(cost * exchange_rate_base) AS total,
  date_paid,
  TO_CHAR(date_paid :: DATE, 'yyyy/mm/dd') as date_paid_nice
  FROM expenditures
  WHERE user_id = $1 AND 
  EXTRACT(MONTH FROM date_paid) = EXTRACT(MONTH FROM NOW())
  GROUP BY date_paid
  ORDER BY date_paid;`;
  const params = [userId];
  return db.query(sql, params).then((data) => data.rows);
};

const getBudgetPercentage = (userId) => {
  const sql = `SELECT u.id as user_id, 
                      EXTRACT(YEAR FROM NOW()) as year, 
                      EXTRACT(MONTH FROM NOW()) as month,
                      u.monthly_budget as budget,
                      SUM(e.cost * e.exchange_rate_base) AS total,
                      TRUNC((SUM(e.cost * e.exchange_rate_base) / u.monthly_budget) * 100) as percentage_spent
                FROM users u
                JOIN expenditures e
                ON u.id = $1 AND u.id = e.user_id AND 
                      EXTRACT(MONTH FROM e.date_paid) = EXTRACT(MONTH FROM NOW()) AND  
                      EXTRACT(YEAR FROM e.date_paid) = EXTRACT(YEAR FROM NOW())
                GROUP BY u.id, u.monthly_budget;`;
  return db.query(sql, [userId]).then((data) => data.rows[0]);
};

const getTotalPerMonth = (userId) => {
  const sql = `SELECT
  SUM(cost * exchange_rate_base) AS total,
  TO_CHAR(DATE_TRUNC('month', date_paid) :: DATE, 'yyyy/mm/dd') AS month
  FROM expenditures
  WHERE user_id = $1
  GROUP BY DATE_TRUNC('month', date_paid);`;
  const params = [userId];
  return db.query(sql, params).then((data) => data.rows);
};

module.exports = {
  getAllExpendituresByUserIdJoinCurrencies,
  deleteExpenditureById,
  createNewExpenditure,
  getAllExpenditures,
  getAllExpendituresByUserId,
  orderExpendituresDate,
  getOneExpenditureById,
  getTotalPerDay,
  getTotalPerMonth,
  getBudgetPercentage,
};
