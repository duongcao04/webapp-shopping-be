const createError = require('http-errors');

const Category = require('../Models/category.model');

const categoryController = {
	// GET ALL PRODUCT
	getAllCategory: async (req, res, next) => {
		try {
			const categories = await Category.find();
			res.status(200).json({ status: 'isOkay', elements: categories });
		} catch (error) {
			next(error)
		}
	},

	// CREATE PRODUCT
	createNewCategory: async (req, res, next) => {
		try {
			const isExist = await Category.findOne({ name: req.body.name })
			if (isExist) {
				throw createError.Conflict(`${req.body.name} is exist in inventory`)
			}

			const newCategory = new Category(req.body)
			const savedProduct = await newCategory.save();

			res.status(200).json(savedProduct)
		} catch (error) {
			next(error);
		}
	},
};

module.exports = categoryController;
