const createError = require('http-errors');

const User = require('../Models/user.model');
const Product = require('../Models/product.model');
const Review = require('../Models/review.model');

const reviewController = {
	getAllReview: async (req, res, next) => {
		try {
			const sortBy = req.query.sortBy ?? '-createdAt';

			const reviews = await Review.find()?.sort(sortBy);

			res
				.status(200)
				.json({ status: 'isOkay', elements: reviews });
		} catch (error) {
			next(error);
		}
	},

	getReviewOfProduct: async (req, res, next) => {
		try {
			const { productId } = req.query
			const reviews = await Review.find({ product_id: productId });

			res.status(200).json({ status: 'isOkay', elements: reviews });
		} catch (error) {
			next(error);
		}
	},

	createNewReview: async (req, res, next) => {
		try {
			const newReview = new Review(req.body);
			const savedReview = await newReview.save();

			if (req.body.user_id) {
				const user = await User.findById(req.body.user_id);
				await user.updateOne({ $push: { reviews: savedReview._id } });
			}
			if (req.body.product_id) {
				const product = await Product.findById(req.body.product_id);
				await product.updateOne({ $push: { reviews: savedReview._id } });
			}

			res.status(200).json(savedPost);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = reviewController;
