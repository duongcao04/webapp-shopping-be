const rootRouter = require('express').Router();
const userRoute = require('./user.route');

const reviewRoute = require('./review.route');
const voucherRoute = require('./voucher.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const supplierRoute = require('./supplier.route');

const postRoute = require('./post.route');

rootRouter.use("/user", userRoute);
rootRouter.use("/review", reviewRoute)

rootRouter.use("/voucher", voucherRoute)
rootRouter.use("/product", productRoute)
rootRouter.use("/category", categoryRoute)
rootRouter.use("/supplier", supplierRoute)

rootRouter.use("/post", postRoute)

module.exports = rootRouter