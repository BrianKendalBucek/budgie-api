const express = require("express");
const router = express.Router();
const UQuery = require("../db/queries/users");

router.get("/auth", async (req, res) => {
  if (!req.session) {
    res.status(404).json({ validated: false, msg: "Session Not Found" });
  } else {
    const id = req.session.user;
    try {
      const user = await UQuery.getUserById(id);
      res.status(202).json({ user });
      return;
    } catch (error) {
      res.status(500);
    }
  }
});

module.exports = router;
