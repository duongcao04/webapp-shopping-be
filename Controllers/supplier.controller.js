const createError = require('http-errors');

const Supplier = require('../Models/supplier.model');

const supplierController = {
  getAllSupplier: async (req, res, next) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json({ status: 'isOkay', elements: suppliers });
    } catch (error) {
      next(error);
    }
  },

  createNewSupplier: async (req, res, next) => {
    try {
      const isExist = await Supplier.findOne({ name: req.body.name });
      if (isExist) {
        throw createError.Conflict(`${req.body.name} is exist in inventory`);
      }

      const newSupplier = new Supplier(req.body);
      const savedSupplier = await newSupplier.save();

      res.status(200).json(savedSupplier);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = supplierController;
