const createError = require('http-errors');

const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const productController = {
	// GET ALL PRODUCT
	getAllProduct: async (req, res, next) => {
		try {
			const products = await Product.find();
			res.status(200).json({ status: 'isOkay', elements: products });
		} catch (error) {
			next(error)
		}
	},

	// GET ONE PRODUCT
	getOneProduct: async (req, res, next) => {
		try {
			const product = await Product.findById(req.params.id);
			res.status(200).json({ status: 'isOkay', elements: product });
		} catch (error) {
			next(error)
		}
	},

	// CREATE PRODUCT
	createNewProduct: async (req, res, next) => {
		try {
			// const isExist = await Product.findOne({ name: req.body.name })
			// if (isExist) {
			// 	throw createError.Conflict(`${req.body.name} is exist in inventory`)
			// }

			const newProduct = new Product(req.body)
			const savedProduct = await newProduct.save();
			
			if (req.body.category_id) {
				const category = await Category.findById(req.body.category_id);
				await category.updateOne({$push: {products: savedProduct._id}})
			}
			res.status(200).json(savedProduct)
		} catch (error) {
			next(error);
		}
	},
};

module.exports = productController;
