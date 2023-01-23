const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

// router.param("");

router.get("/convert", async (req, res) => {
  // https://github.com/fawazahmed0/currency-api
  console.log("Hi from convert api :) ");
  console.log(req.query);
  const { to, from, amount } = req.query;
  const codesUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";

  const Rates = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`;

  let list = await axios.get(Rates);
  // let baseRate = await axios.get(Rates);
  // console.log(baseRate.data);
  // const rate = baseRate.data[to];
  // console.log(rate);
  // console.log(list.data);

  // ON HOME PAGE LOAD FETCH EXCHANGE RATE
  // STORE INTO THE DB
  // DO THE CALCS
  // SEND BACK THE AMOUNT TO FRONT END

  res.send(list.data);
});

module.exports = router;
