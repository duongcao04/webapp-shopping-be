const rootRouter = require('express').Router();
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');

rootRouter.use("/user",userRoute);
rootRouter.use("/product",productRoute)
rootRouter.use("/category",categoryRoute)

module.exports = rootRouter