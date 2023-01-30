/*
 * All routes for expendatures Data are defined here
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
  console.log(id);
  EQueries.getAllExpendituresById(id)
    .then((expenses) => {
      res.json({ expenses });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  // res.send(`hello expenditures: ${req.params.id}`);
});

module.exports = router;
