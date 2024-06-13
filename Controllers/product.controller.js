const createError = require('http-errors');

const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const { formatPrice } = require('../helpers/formatPrice');
const mongoose = require('mongoose');

const productController = {
	// GET ALL PRODUCT
	getAllProduct: async (req, res, next) => {
		try {
			const query = req.query;

			if (query) {
				const { limit, sortBy } = query;
				const products = await Product.find()?.limit(limit)?.sort(sortBy);
				res.status(200).json({ status: 'isOkay', elements: products });
			}

			const products = await Product.find();
			res.status(200).json({ status: 'isOkay', elements: products });
		} catch (error) {
			next(error);
		}
	},

	// FILTER PRODUCT
	filterProduct: async (req, res, next) => {
		try {
			const query = req.query;

			if (query) {
				const { categoryId, price, sortBy } = query;
				const categoryIdList = categoryId.split(',');
				const cateToObjectID = categoryIdList.map(ele => new mongoose.Types.ObjectId(ele.id));
				console.log(categoryIdList);
				const handleFormatPrice = formatPrice(price);

				const findOptions = [];

				if (price) {
					findOptions.push(['price', handleFormatPrice])
				}

				// if (category) {
				// 	findOptions.push(['category', handleFormatCategory])
				// }
				const findOptionsToObject = Object.fromEntries(findOptions)
				const products = await Product.find()?.sort(sortBy).where('category_id').in(cateToObjectID).exec();

				res.status(200).json({ status: 'isOkay', elements: products });
			}

			const products = await Product.find();
			res.status(200).json({ status: 'isOkay', elements: products });
		} catch (error) {
			next(error);
		}
	},

	// PAGINATION PRODUCT
	pagination: async (req, res, next) => {
		try {
			const perPage = req.query.limit;
			const sortBy = req.query.sortBy ?? 'name';
			const page = req.query.page ?? '1';
			const totalProduct = await Product.countDocuments();
			const totalPage = Math.round(totalProduct / (perPage ?? 16));

			const products = await Product.find().sort(sortBy)?.limit(perPage).skip((perPage * page) - perPage);

			res.status(200).json({ status: 'isOkay', totalPage, elements: products });
		} catch (error) {
			next(error);
		}
	},

	// GET ONE PRODUCT
	getOneProduct: async (req, res, next) => {
		try {
			const product = await Product.findById(req.params.id);
			res.status(200).json({ status: 'isOkay', elements: product });
		} catch (error) {
			next(error);
		}
	},

	// CREATE PRODUCT
	createNewProduct: async (req, res, next) => {
		try {
			// const isExist = await Product.findOne({ name: req.body.name })
			// if (isExist) {
			// 	throw createError.Conflict(`${req.body.name} is exist in inventory`)
			// }

			const newProduct = new Product(req.body);
			const savedProduct = await newProduct.save();

			if (req.body.category_id) {
				const category = await Category.findById(req.body.category_id);
				await category.updateOne({ $push: { products: savedProduct._id } });
			}
			res.status(200).json(savedProduct);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = productController;
