const router = require('express').Router();
const productController = require('../Controllers/product.controller');

// GET ALL PRODUCT
router.get("/", productController.getAllProduct);

// FILTER PRODUCT
router.get("/filter", productController.filterProduct);

// PAGINATION
router.get("/pagination", productController.pagination);

// GET ONE PRODUCT
router.get("/:id", productController.getOneProduct);

// CREATE NEW PRODUCT
router.post("/create", productController.createNewProduct)

// DELETE PRODUCT
router.delete("/:id", productController.deleteProduct)

// UPDATE PRODUCT
router.put("/:id", productController.updateProduct)

module.exports = router;