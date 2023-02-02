const express = require("express");
const router = express.Router();
const UQuery = require("../db/queries/users");

router.post("/login", async (req, res) => {
  console.log(req.session);
  const { email, password } = req.body;
  const user = await UQuery.getUserByEmail(email);
  if (!user) {
    res.json({ error: "User not found" });
    return;
  }
  if (email && password) {
    if (req.session.user) {
      //already logged in
      // req.session.user = user.id;
      res.status(200).json({ status: "already logged in" });
    } else {
      if (password === user.password) {
        req.session.user = user.id;
        res.status(200).json({ status: true });
      } else {
        res.status(403).json({ error: "wrong password" });
      }
    }
  } else {
    res.status(403).json({ error: "bad info" });
  }
});

router.post("/logout", (req, res) => {
  console.log(req.session, req.cookies, req.sessionID);
  // req.session = null;
  // console.log(req.cookies);
  // req.session.destroy();

  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        // res.clearCookie
        res.clearCookie("connect.sid").send("Logout successful");
      }
    });
  } else {
    res.end("Not logged in");
  }

  // res.json({ status: true });
});

module.exports = router;
