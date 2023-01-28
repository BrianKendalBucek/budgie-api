const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.post("/cat/:id", (req, res) => {
  console.log(req.body.name);
  const { name, userID } = req.body;
  return db
    .query(`INSERT INTO categories(user_id, name) VALUES ($1, $2);`, [
      userID,
      name,
    ])
    .then((data) => {
      return res.json(data.rows);
    })
    .catch((err) => console.log(err));
});

router.get("/cat/all/:id", (req, res) => {
  const id = req.params.id;
  return db
    .query(`SELECT * FROM categories WHERE user_id=$1;`, [id])
    .then((data) => {
      console.log("Hi from inside GET");
      return res.json(data.rows);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
