const express = require("express");
const router = express.Router();
const UQuery = require("../db/queries/users");

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, currencyId, monthlyBudget } =
    req.body;
  try {
    const doesExist = UQuery.getUserByEmail(email);
    if (!doesExist) {
      res.status(400).json("User Already exists with that email");
    } else {
    }
  } catch (error) {}
});

module.exports = router;
