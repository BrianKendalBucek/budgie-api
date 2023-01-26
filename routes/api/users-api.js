/*
 * All routes for expendatures Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// const expendituresByIdQuery = require

router.get('/', (req, res) => {
  res.send(`hello users`);
});

router.get('/:id', (req, res) => {
  res.send(`hello user: ${req.params.id}`);
});

module.exports = router;