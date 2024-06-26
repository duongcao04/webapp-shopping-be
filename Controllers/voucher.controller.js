const createError = require('http-errors');

const Voucher = require('../Models/voucher.model');

const voucherController = {
	getAllVoucher: async (req, res, next) => {
		try {
			const sortBy = req.query.sortBy ?? '-createdAt';

			const voucher = await Voucher.find()?.sort(sortBy);

			res
				.status(200)
				.json({ status: 'isOkay', elements: voucher });
		} catch (error) {
			next(error);
		}
	},

	createNewVoucher: async (req, res, next) => {
		try {
			const newVoucher = new Voucher(req.body);
			const savedVoucher = await newVoucher.save();

			res.status(200).json(savedVoucher);
		} catch (error) {
			next(error);
		}
	},

	deleteVoucher: async (req, res, next) => {
		try {
			const voucher = await Voucher.findByIdAndDelete(req.params.id);

			if (!voucher) {
				throw createError.NotFound(`Voucher not found`);
			}

			res.json({ status: 'isOkay', message: 'Voucher removed' });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = voucherController;
