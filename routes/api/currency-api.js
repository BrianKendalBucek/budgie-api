/*
 * All routes for currency Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/currency
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const currencyQueries = require("../../db/queries/currency");
const express = require("express");
const router = express.Router();

// const allCurrenciesQuery = require
// const currencyByIdQuery = require

router.get("/", (req, res) => {
  currencyQueries
    .getAllCurrencies()
    .then((currencies) => res.json({ currencies }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:code", (req, res) => {
  const { code } = req.params;
  currencyQueries
    .getCurrencyByCountryCode(code)
    .then((currency) => res.json({ currency }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
