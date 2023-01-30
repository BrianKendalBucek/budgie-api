/*
 * All routes for expenditures Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/expenditures
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const EQueries = require("../../db/queries/expenditures");
const express = require("express");
const router = express.Router();

// const expendituresByIdQuery = require

router.get("/:id", (req, res) => {
  const id = req.params.id;
  EQueries.getAllExpendituresByUserId(id)
    .then((expenses) => {
      res.json({ expenses });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// set up route to get a single expense
// router.get("", (req, res) => {});

module.exports = router;
