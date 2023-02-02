const db = require("../connection");

const getAllCurrencies = () => {
  return db.query(`SELECT * FROM currencies;`).then((data) => data.rows);
};

const getCurrencyByCountryCode = (code) => {
  const sql = `SELECT * FROM currencies WHERE code=$1;`;
  const params = [code];
  return db.query(sql, params).then((data) => data.rows[0]);
};

module.exports = {
  getAllCurrencies,
  getCurrencyByCountryCode,
};