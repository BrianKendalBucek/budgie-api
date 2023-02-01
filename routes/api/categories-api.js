/*
 * All routes for category Data are defined here
 * Since this file is loaded in server.js into api/categories,
 *   these routes are mounted onto /api/categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const categoryQueries = require("../../db/queries/categories");

router.get("/", (req, res) => {
  categoryQueries
    .getAllCategories()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/get_categories_by_id", (req, res) => {
  const userId = req.session.user;
  // const userId = req.params.user_id;
  categoryQueries
    .getAllCategoriesByUser(userId)
    .then((catByUser) => {
      res.json(catByUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id/delete", (req, res) => {
  categoryQueries
    .deleteCategoryById(req.params.id)
    .then(() => res.status(204).json({}))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const { id, categoryName } = req.body;

  categoryQueries
    .addCategory(categoryName, id)
    .then(() => res.status(204).json({}))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
