const rootRouter = require('express').Router();
const userRoute = require('./user.route');
const productRoute = require('./product.route');

rootRouter.use("/user",userRoute);
rootRouter.use("/product",productRoute)

module.exports = rootRouter