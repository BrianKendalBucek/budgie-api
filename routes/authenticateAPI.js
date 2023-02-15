const express = require("express");
const router = express.Router();
const UQueries = require("../db/queries/users");

router.use("/", async (req, res, next) => {
  console.log("API route auth...");

  if (!req.session.user) {
    res.status(401).json("Not logged in");
    return;
  } else {
    try {
      const id = req.session.user;
      const user = await UQueries.authUser(id);
      if (!user) {
        res.status(401).json("Not logged in");
      } else {
        next();
      }
    } catch (error) {
      res.status(500);
    }
  }
});

module.exports = router;
