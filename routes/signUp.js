const express = require("express");
const router = express.Router();
const UQuery = require("../db/queries/users");

router.post("/signup", (req, res) => {
  res.send("hello from sign up");
});

module.exports = router;
