const supplierController = require('../Controllers/supplier.controller');

const router = require('express').Router();

router.get("/", supplierController.getAllSupplier);

router.post("/create", supplierController.createNewSupplier)

module.exports = router;