const createError = require('http-errors');

const User = require('../Models/user.model');
const Product = require('../Models/product.model');
const Review = require('../Models/review.model');

const reviewController = {
	getAllReview: async (req, res, next) => {
		try {
			const sortBy = req.query.sortBy ?? '-createdAt';
			const productId = req.query.productId;

			const handleRenderOptions = () => {
				let result = {};
				if (req.query.productId) {
					result['product_id'] = productId;
				}
				return result;
			}

			const options = handleRenderOptions();

			console.log(options);

			const reviews = await Review.find(options)?.sort(sortBy);
			// const reviews = await Review.find({ product_id: productId });

			res
				.status(200)
				.json({ status: 'isOkay', elements: reviews });
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

			res.status(200).json(savedReview);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = reviewController;
