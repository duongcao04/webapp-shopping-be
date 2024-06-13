const categoryController = require('../Controllers/category.controller');

const router = require('express').Router();

// GET ALL PRODUCT
router.get("/", categoryController.getAllCategory);

// CREATE NEW PRODUCT
router.post("/create", categoryController.createNewCategory)

module.exports = router;