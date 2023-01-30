/*
 * All routes for expendatures Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/expenditures
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// const expendituresByIdQuery = require

router.get('/:id', (req, res) => {
  res.send(`hello expenditures: ${req.params.id}`);
});

module.exports = router;