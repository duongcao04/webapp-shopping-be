const createError = require('http-errors');

const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const { formatPrice } = require('../helpers/formatPrice');
const mongoose = require('mongoose');

const productController = {
  // GET ALL PRODUCT
  getAllProduct: async (req, res, next) => {
    try {
      const sortBy = req.query.sortBy;

      const products = await Product.find()?.sort(sortBy);
      const totalProduct = await Product.find().countDocuments();

      res
        .status(200)
        .json({ status: 'isOkay', totalProduct, elements: products });
    } catch (error) {
      next(error);
    }
  },

  // FILTER PRODUCT
  filterProduct: async (req, res, next) => {
    try {
      const query = req.query;

      if (query) {
        const perPage = query.limit;
        const sortBy = query.sortBy ?? '-price';
        const page = query.page ?? '1';
        const categoryId = query.categoryId ?? null;
        const price = query.price;

        const handleFindOptions = () => {
          let result = {};

          if (price) {
            const handleFormatPrice = formatPrice(price);
            result['price'] = handleFormatPrice;
          }

          if (categoryId) {
            let categoryIdList;
            if (categoryId.includes(','))
              categoryIdList = categoryId.split(',');
            else categoryIdList = categoryId;

            result['category_id'] = categoryIdList;
          }
          return result;
        };

        const findOptions = handleFindOptions();

        const products = await Product.find(findOptions)
          ?.sort(sortBy)
          ?.limit(perPage)
          ?.skip(perPage * page - perPage);

        const totalProduct = await Product.find(findOptions).countDocuments();
        const totalPage = Math.ceil(totalProduct / (perPage ?? totalProduct));

        res.status(200).json({
          status: 'isOkay',
          totalProduct,
          totalPage,
          elements: products,
        });
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

      const products = await Product.find()
        .sort(sortBy)
        ?.limit(perPage)
        .skip(perPage * page - perPage);

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

  // DELETE PRODUCT
  deleteProduct: async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        throw createError.NotFound(`Product not found`);
      }

      res.json({ status: 'isOkay', message: 'Product removed' });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE PRODUCT
  updateProduct: async (req, res, next) => {
    try {
      const product = await Product.updateOne({ _id: req.params.id }, req.body);
      
      if (!product) {
        throw createError.NotFound(`Product not found`);
      }
      res.json({ status: 'isOkay', message: 'Product updated' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
