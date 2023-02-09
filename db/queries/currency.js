const db = require("../connection");

const getAllCurrencies = () => {
  return db.query(`SELECT * FROM currencies;`).then((data) => data.rows);
};

const getCurrencyByCountryCode = (code) => {
  const sql = `SELECT * FROM currencies WHERE code=$1;`;
  const params = [code];
  return db.query(sql, params).then((data) => data.rows[0]);
};

const getCurrencyByCurrencyId = (id) => {
  const sql = `SELECT * FROM currencies WHERE id=$1;`;
  const params = [id];
  return db.query(sql, params).then((data) => data.rows[0] || null);
};

module.exports = {
  getCurrencyByCurrencyId,
  getAllCurrencies,
  getCurrencyByCountryCode,
};
