const router = require('express').Router();
const voucherController = require('../Controllers/voucher.controller')

router.get("/", voucherController.getAllVoucher);

router.post("/create", voucherController.createNewVoucher);

router.delete("/:id", voucherController.deleteVoucher);


module.exports = router;