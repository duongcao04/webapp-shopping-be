const router = require('express').Router();
const productController = require('../Controllers/product.controller');

// GET ALL PRODUCT
router.get("/", productController.getAllProduct);

// GET ONE PRODUCT
router.get("/:id", productController.getOneProduct)

// CREATE NEW PRODUCT
router.post("/create", productController.createNewProduct)

module.exports = router;