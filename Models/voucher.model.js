const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		discountAmount: {
			type: Number,
			required: true,
		},
		ExpiryDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Voucher', VoucherSchema);
