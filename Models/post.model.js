const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		featureImg: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
