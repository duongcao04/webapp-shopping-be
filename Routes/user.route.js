const router = require('express').Router();
const userController = require('../Controllers/user.controller');
const { verifyAccessToken } = require('../helpers/jwt_services');

// Authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/refresh-token', userController.refreshToken);

router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// router.put('/add-order/:id', userController.addOrder);

module.exports = router;
