// const countryCodes = require("../db/testData/countryCodes.json");
// const toUSDRates = require("./db/testData/toUSDRates.json");
const fs = require("fs");
const path = require("path");

const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// loop through country codes and create an array of [{name, code, rate_to_usd}]
// need to loop through the usd json and match the country code too pull the rate

const createCurrencySeed = () => {
  const output = [];
  const toRateObj = JSON.parse(
    fs.readFileSync("./db/testData/toUSDRates.json", "utf8", (err, data) => {
      if (err) throw err;
      return data;
    })
  );

  const code = JSON.parse(
    fs.readFileSync("./db/testData/countryCodes.json", "utf8", (err, data) => {
      if (err) throw err;
      return data;
    })
  );

  for (c in code) {
    for (toUsd in toRateObj.usd) {
      if (c === toUsd) {
        const insert = {
          name: code[c],
          code: c,
          rateToUsd: toRateObj.usd[toUsd],
        };
        output.push(insert);
      }
    }
  }
  return output;
};

// console.log(createCurrencySeed().length);

module.exports = { randomNumBetween, createCurrencySeed };
