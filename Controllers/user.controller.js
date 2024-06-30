const createError = require('http-errors');

const User = require('../Models/user.model');
const Review = require('../Models/review.model');

const { userValidate } = require('../helpers/validation');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_services');

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { error } = userValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        throw createError.Conflict(
          `${req.body.email} is ready been registered`
        );
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          fullName: req.body.fullName,
          avatar: req.body.avatar,
          role: req.body.role,
        });

        const user = await newUser.save();

        res.status(200).json({ status: 'isOkay', elements: user });
      }
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { error } = userValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw createError.NotFound(`User not registered`);
      }
      const isValid = await user.isCheckedPasswrod(req.body.password);
      if (!isValid) {
        throw createError.Unauthorized();
      }
      const accessToken = await signAccessToken(user);
      const refreshToken = await signRefreshToken(user);
      //Don't res password in object user
      const { password, ...others } = user._doc;

      res
        .status(200)
        .json({ status: 'isOkay', elements: others, token: accessToken });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();

      const { userId, userRole } = await verifyRefreshToken(refreshToken);
      const newAccessToken = await signAccessToken({
        id: userId,
        role: userRole,
      });
      const newRefreshToken = await signRefreshToken({
        id: userId,
        role: userRole,
      });
      res.json({ newAccessToken, newRefreshToken });
    } catch (error) {
      next(error);
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const handleFindOptions = () => {
        let result = {};

        if (req.query.name) {
          result['fullName'] = { $regex: req.query.name };
        }
        return result;
      };

      const findOptions = handleFindOptions();

      const user = await User.find(findOptions);
      res.status(200).json({ status: 'isOkay', elements: user });
    } catch (error) {
      next(error);
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({ status: 'isOkay', elements: user });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(req.params.id);
      await Review.deleteMany({user_id: userId});

      res.status(200).json({
        status: 'isOkay',
        message: 'Delete successfully',
        elements: user,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const user = await User.updateOne({ _id: req.params.id }, req.body);

      if (!user) {
        throw createError.NotFound(`User not exist`);
      }
      res.json({ status: 'isOkay', message: 'User updated' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
