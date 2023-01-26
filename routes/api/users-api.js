/*
 * All routes for expendatures Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const userQuery = require('../../db/queries/users');

router.get('/', (req, res) => {
  userQuery.getAllUsers()
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  res.send(`hello user: ${req.params.id}`);
});

module.exports = router;