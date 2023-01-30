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
  const id = req.body.id;
  EQueries.getAllExpendituresById(id)
    .then((item) => {
      res.status(204).json({ item });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  res.send(`hello expenditures: ${req.params.id}`);
});

module.exports = router;
