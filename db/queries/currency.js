const db = require("../connection");

const getAllCurrencies = () => {
  return db.query(`SELECT * FROM currencies;`).then((data) => data.rows);
};

const getCurrencyByCountryCode = async (code) => {
  const sql = `SELECT * FROM currencies WHERE code=$1;`;
  const params = [code];
  const data = await db.query(sql, params);
  return data.rows[0];
};

module.exports = {
  getAllCurrencies,
  getCurrencyByCountryCode,
};
