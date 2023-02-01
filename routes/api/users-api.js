/*
 * All routes for expendatures Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const userQuery = require("../../db/queries/users");

router.get("/", (req, res) => {
  userQuery
    .getAllUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  userQuery.get;
  userQuery
    .getUserById(1)
    .then((user) => {
      res.json({ ...user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  userQuery
    .getUserById(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });
});

module.exports = router;
