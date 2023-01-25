// const countryCodes = require("../db/testData/countryCodes.json");
// const toUSDRates = require("./db/testData/toUSDRates.json");
const fs = require("fs");
const path = require("path");

const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// loop through country codes and create an array of [name, code, rate_to_usd]
// need to loop through the usd json and match the country code too pull the rate

const createCurrencySeed = () => {
  const countryCode = fs.readFile(
    "./db/testData/countryCodes.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      console.log(data);
    }
  );
  console.log(countryCode);
};

createCurrencySeed();

module.exports = { randomNumBetween };
