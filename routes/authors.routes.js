const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/authors.controller");
const { createAuthor } = require('../queries/author.queries');
const router = express.Router();

router.get('/', entriesController.getAuthors);
router.put("/", entriesController.editAuthor);
router.delete("/:email",entriesController.deleteAuthor);
router.post("/",entriesController.createAuthor)


module.exports = router;