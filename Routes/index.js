const rootRouter = require('express').Router();
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const supplierRoute = require('./supplier.route');

rootRouter.use("/user",userRoute);
rootRouter.use("/product",productRoute)
rootRouter.use("/category",categoryRoute)
rootRouter.use("/supplier",supplierRoute)

module.exports = rootRouter