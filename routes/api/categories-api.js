/*
 * All routes for category Data are defined here
 * Since this file is loaded in server.js into api/categories,
 *   these routes are mounted onto /api/categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const categoryQueries = require('../../db/queries/categories');

router.post('/add_category', (req, res) => {
  const category_name = req.body.name;
  const user_id = req.body.user_id;
});

router.get("/get_categories_by_id/:user_id", (req, res) => {
  const userId = req.params.user_id;
  console.log(userId);
  categoryQueries.getAllCategoriesByUser(userId)
    .then(items => {
      res.json({ items })
    })
    .catch( err => {
      res
        .status(500)
        .json( {error: err.message});
    });
});

router.delete("./delete_category_by_id/:id", (req, res) => {

});


//TODO: delete this
router.get("/", (req, res) => {
  console.log("in root")
  res.send("hello categories");
});

module.exports = router;

