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
  console.log(req.session.user.id);

  userQuery
    .getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", async (req, res) => {
  console.log(req.session, req.session.user);
  const { email, password } = req.body;
  const user = await userQuery.getUserByEmail(email);
  if (!user) {
    res.json({ error: "User not found" });
    return;
  }
  if (email && password) {
    if (req.session.authenticated) {
      req.session.user = { ...user };
      // res.cookie("id", user.id);
      res.json(req.session.user.id);
    } else {
      if (password === user.password) {
        (req.session.authenticated = true), (req.session.user = { ...user });
        // res.cookie("id", user.id);
        res.json(req.session.user.id);
      } else {
        res.status(403).json({ error: "wrong password" });
      }
    }
  } else {
    res.status(403).json({ error: "bad info" });
  }
  // console.log(email, password);
  // userQuery
  //   .getUserById(1)
  //   .then((user) => {
  //     res.json({ ...user });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //     console.log(err);
  //   });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  userQuery
    .getUserById(userId)
    .then((user) => {
      res.json({ ...user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      console.log(err);
    });
});

module.exports = router;
