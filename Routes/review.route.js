const router = require('express').Router();
const reviewController = require('../Controllers/review.controller')

router.get("/", reviewController.getAllReview);

router.post("/create", reviewController.createNewReview);


module.exports = router;