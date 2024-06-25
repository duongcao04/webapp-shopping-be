const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		imgURL: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true,
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		supplier_id: {
			type: Schema.Types.ObjectId,
			ref: 'Supplier',
		},
		reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
