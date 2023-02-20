const { default: axios } = require("axios");
const fs = require("fs");
const moment = require("moment");
const express = require("express");

const createCurrencytoInsert = (rate, code) => {
  const output = [];
  for (c in code) {
    for (toUsd in rate.usd) {
      if (c === toUsd) {
        const insert = {
          name: code[c],
          code: c,
          rateToUsd: rate.usd[toUsd],
        };
        output.push(insert);
      }
    }
  }
  return output;
};

const updateRates = async () => {
  // https://github.com/fawazahmed0/currency-api

  const codesUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";

  const Rates = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`;

  let rateList = await axios.get(Rates);
  const ratesOnFile = JSON.parse(
    fs.readFileSync("./db/testData/toUSDRates.json", "utf8", (err, data) => {
      if (err) throw err;
      return data;
    })
  );

  const isUpdate = moment(ratesOnFile.date).isBefore(rateList.data.date);
  if (isUpdate) {
    // write to file, then insert into db
    const codeList = await axios.get(codesUrl);
    const toInsert = createCurrencytoInsert(rateList.data, codeList.data);

    const jsonString = JSON.stringify(rateList.data);
    fs.writeFile("./db/testData/USDates.json", jsonString, "utf8", (err) => {
      if (err) throw err;
      console.log("data written successfully");
    });

    // const sql1 = `TRUNCATE TABLE currencies;`
    // await db.query(sql1)
    // const sql2 = `INSERT INTO currencies(name, code, date_added, rate_to_usd) VALUES ($1, $2, $3, $4);`;

    // const date = new Date();
    // for (let i = 0; i < toInsert.length; i++) {
    //   const params = [
    //     toInsert[i].name,
    //     toInsert[i].code,
    //     date,
    //     toInsert[i].rateToUsd,
    //   ];
    //   await db.query(sql2, params);
    // }
  } else {
    console.log("Update not needed");
    return;
  }
  return;
};

module.exports = updateRates;
