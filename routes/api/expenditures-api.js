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
// route to add
// route to delete
// route to edit
// router.get("", (req, res) => {});

router.post("/", (req, res) => {
  const params = ({
    userId,
    currencyId,
    cost,
    exchangeRateBase,
    datePaid,
    categoryId,
    notes,
  } = req.body);
  const arrayParams = Object.values(params);

  EQueries.createNewExpenditure(arrayParams)
    .then((inserted) => res.json({ inserted }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:id/delete", (req, res) => {
  const { id } = req.params;
  EQueries.deleteExpenditureById(id)
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
});
module.exports = router;
