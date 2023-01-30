const db = require("../connection");

const getAllCurrencies = () => {
  return db.query(`SELECT * FROM currencies;`).then((data) => data.rows);
};

const getCurrencyByCountryCode = (code) => {
  return db
    .query(`SELECT * FROM currencies WHERE code='${code}';`)
    .then((data) => data.rows);
};

module.exports = {
  getAllCurrencies,
  getCurrencyByCountryCode,
};
