const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

//establecer las rutas aqui:
router.get('/', entriesController.getEntries);
router.put("/", entriesController.editEntry);
router.delete("/:title",entriesController.deleteEntry);


module.exports = router;

