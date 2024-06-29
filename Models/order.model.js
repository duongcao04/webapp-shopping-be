const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		_id: { type: Schema.ObjectId, auto: true },
		createdAt: {
			type: Date,
			default: Date.now,
		},
		orderStatus: {
			type: String,
			enum: ['Đang xử lý', 'Đã xác nhận'],
			default: 'Đang xử lý',
		},
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		information: {
			type: Object,
			name: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			phoneNumber: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			note: {
				type: String,
			},
		},
		orderDetail: {
			type: Object,
			productList: {
				type: Array
			},
			shipping: {
				type: Number,
			},
			voucher: {
				type: Object,
			},
			giftPoint: {
				type: Number,
				default: 0,
			},
			totalAmount: {
				type: Number,
			},
		},
	},
	{ timestamps: true }
);

OrderSchema.pre('save', async function (next) {
	try {
		if (this.orderDetail.voucher) this.orderDetail.giftPoint = (this.orderDetail.totalAmount - this.orderDetail.shipping + this.orderDetail.voucher.discountAmount)*0.01;
		else this.orderDetail.giftPoint = (this.orderDetail.totalAmount - this.orderDetail.shipping)*0.01
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('Order', OrderSchema);
