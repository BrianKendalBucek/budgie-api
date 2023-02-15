const express = require("express");
const router = express.Router();
const UQuery = require("../db/queries/users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await UQuery.getUserByEmail(email.trim());
    if (!user) {
      res.json({ validated: false, msg: "User Not Found" });
      return;
    }

    if (email && password) {
      if (req.session.user) {
        //already logged in
        res.status(200).json("already logged in");
      } else {
        if (password === user.password) {
          req.session.user = user.id;
          // success
          res.status(202).json({
            validated: true,
            firstName: user.first_name,
            lastName: user.last_name,
          });
        } else {
          // wrong password
          res.status(401).json({ validated: false, msg: "Wrong Password" });
        }
      }
    } else {
      // email and password not truthy
      res.status(403).json({ validated: false, msg: "Invalid Input" });
    }
  } catch (error) {
    res.status(500);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(403).send("Unable to log out");
      } else {
        res.clearCookie("connect.sid").send("Logout successful");
      }
    });
  } else {
    res.status(403).end("Not logged in");
  }
});

module.exports = router;
