const rootRouter = require('express').Router();
const userRoute = require('./user.route');

rootRouter.use("/user",userRoute);

module.exports = rootRouter