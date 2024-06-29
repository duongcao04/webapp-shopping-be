const orderController = require('../Controllers/order.controller');

const router = require('express').Router();


router.get("/", orderController.getAllOrder);

router.get("/:id", orderController.getOrderById);

router.post("/create", orderController.createOrder)

router.put("/:id", orderController.updateOrder)

router.delete("/:id", orderController.deleteOrder)

module.exports = router;