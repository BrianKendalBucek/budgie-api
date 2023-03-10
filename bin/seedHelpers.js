const fs = require("fs");
const path = require("path");

const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

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

module.exports = { randomNumBetween, createCurrencySeed };
