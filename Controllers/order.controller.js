const mongoose = require('mongoose');
const createError = require('http-errors');

const Order = require('../Models/order.model');
const User = require('../Models/user.model');

const { formatPrice } = require('../helpers/formatPrice');

const orderController = {
	getAllOrder: async (req, res, next) => {
		try {
			const { sortBy, limit, userId } = req.query;

			const handleFindOptions = () => {
				let result = {};
				if (userId) {
					result['user_id'] = userId;
				}
				return result;
			};

			const findOptions = handleFindOptions();
			const orders = await Order.find(findOptions)?.sort(sortBy)?.limit(limit);

			res.status(200).json({ status: 'isOkay', elements: orders });
		} catch (error) {
			next(error);
		}
	},

	getOrderById: async (req, res, next) => {
		try {
			const order = await Order.findById(req.params.id);
			res.status(200).json({ status: 'isOkay', elements: order });
		} catch (error) {
			next(error);
		}
	},

	createOrder: async (req, res, next) => {
		try {
			const newOrder = new Order(req.body);
			const savedOrder = await newOrder.save();

			if (req.body.user_id) {
				const user = await User.findById(req.body.user_id);
				let updatedTotalPoint =
					user.totalPoint + savedOrder.orderDetail.giftPoint;
				await user.updateOne({
					totalPoint: updatedTotalPoint,
					$push: { historyOrder: savedOrder._id },
				});
			}
			res.status(200).json(savedOrder);
		} catch (error) {
			next(error);
		}
	},

	deleteOrder: async (req, res, next) => {
		try {
			const order = await Order.findByIdAndDelete(req.params.id);

			if (!order) {
				throw createError.NotFound(`Order not found`);
			}

			res.json({ status: 'isOkay', message: 'Order removed' });
		} catch (error) {
			next(error);
		}
	},

	updateOrder: async (req, res, next) => {
		try {
			const order = await Order.updateOne({ _id: req.params.id }, req.body);

			if (!order) {
				throw createError.NotFound(`Product not found`);
			}
			res.json({ status: 'isOkay', message: 'order updated' });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = orderController;
