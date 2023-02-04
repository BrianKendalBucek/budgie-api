const express = require("express");
const router = express.Router();
const UQueries = require("../db/queries/users");

router.use("/", async (req, res, next) => {
  // is there a logged in user?
  // double check the db
  // continue to next api request
  console.log("all api routes go through ME!!!!!!");

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
      console.log(error);
      res.status(500);
    }
  }
});

module.exports = router;
