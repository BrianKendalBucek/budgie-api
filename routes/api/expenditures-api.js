/*
 * All routes for expenditures Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/expenditures
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const EQueries = require("../../db/queries/expenditures");
const express = require("express");
const router = express.Router();

router.get("/singleExpense", (req, res) => {
  const { expenseId } = req.body;
  EQueries.getOneExpenditureById(expenseId)
    .then((item) => res.json({ singleExpense: item }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/", (req, res) => {
  const userId = req.session.user;
  EQueries.getAllExpendituresByUserIdJoinCurrencies(userId)
    .then((expenses) => {
      res.json(expenses);
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
  const userId = req.session.user;
  const params = ({
    currencyId,
    cost,
    datePaid,
    categoryId,
    notes,
  } = req.body);

  EQueries.createNewExpenditure(params.newExpense.currencyId, params.newExpense.cost, params.newExpense.datePaid, params.newExpense.categoryId, params.newExpense.notes, userId)
    .then((inserted) => res.json(inserted).status(204))
    .catch((err) => res.status(500).json({ error: err.message }));

});

router.get("/totals_per_day", (req, res) => {
  const userId = req.session.user;
  EQueries.getTotalPerDay(userId)
    .then((totals) => {
      res.json(totals);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/budget_spent", (req, res) => {
  const userId = req.session.user;
  EQueries.getBudgetPercentage(userId)
    .then((totals) => {
      res.json(totals);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// TODO: think about response on delete
router.delete("/delete", (req, res) => {
  const { expenseId } = req.body;
  EQueries.deleteExpenditureById(expenseId)
    .then(() => res.json({ delete: "done" }).status(204))
    .catch((err) => res.status(500).json({ error: err.message }));
});
module.exports = router;
