const mongoose = require('mongoose');
const createError = require('http-errors');

const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const { formatPrice } = require('../helpers/formatPrice');

const productController = {
  getAllProduct: async (req, res, next) => {
    try {
      const { sortBy, limit, name } = req.query;

      const handleFindOptions = () => {
        let result = {};
        if (name) {
          result['name'] = { $regex: name };
        }
        return result;
      };

      const findOptions = handleFindOptions();

      const products = await Product.find(findOptions)?.sort(sortBy)?.limit(limit);
      const totalProduct = await Product.find().countDocuments();

      res
        .status(200)
        .json({ status: 'isOkay', totalProduct, elements: products });
    } catch (error) {
      next(error);
    }
  },

  filterProduct: async (req, res, next) => {
    try {
      const query = req.query;

      if (query) {
        const perPage = query.limit;
        const sortBy = query.sortBy ?? '-price';
        const page = query.page ?? '1';
        const categoryId = query.categoryId ?? null;
        const price = query.price;
        const name = query.name;

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

          if (name) {
            result['name'] = { $regex: name };
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

  pagination: async (req, res, next) => {
    try {
      const name = req.query.name;
      const perPage = req.query.limit;
      const sortBy = req.query.sortBy ?? 'name';
      const page = req.query.page ?? '1';
      const totalProduct = await Product.countDocuments();

      const totalPage = Math.round(totalProduct / (perPage ?? 16));

      const handleFindOptions = () => {
        let result = {};
        if (name) {
          result['name'] = { $regex: name };
        }
        return result;
      };

      const findOptions = handleFindOptions();

      const products = await Product.find(findOptions)
        .sort(sortBy)
        ?.limit(perPage)
        .skip(perPage * page - perPage);

      res.status(200).json({ status: 'isOkay', totalProduct, totalPage, elements: products });
    } catch (error) {
      next(error);
    }
  },

  getOneProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({ status: 'isOkay', elements: product });
    } catch (error) {
      next(error);
    }
  },

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
