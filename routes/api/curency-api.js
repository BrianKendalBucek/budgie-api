/*
 * All routes for currency Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/currency
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// const allCurrenciesQuery = require
// const currencyByIdQuery = require

router.get('/', (req, res) => {
  res.send("hello currencies")
})

router.get('/:id', (req, res) => {
  res.send(`hello: ${req.params.id}`)
})

module.exports = router;