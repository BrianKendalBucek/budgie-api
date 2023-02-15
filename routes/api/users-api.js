/*
 * All routes for expenditures Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const userQuery = require("../../db/queries/users");

router.get("/", (req, res) => {
  const userId = req.session.user;
  userQuery
    .getUserById(userId)
    .then((user) => {
      res.json({ ...user });
      // TODO look into return value from SQL -> json
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });
});

router.put("/", (req, res) => {
  const userId = req.session.user;
  const { currencyId } = req.body;
  userQuery
    .updateUserCurrency(userId, currencyId)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });
});

router.put("/budget", (req, res) => {
  const userId = req.session.user;
  const { budget } = req.body;
  userQuery
    .updateUserBudget(userId, budget)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
