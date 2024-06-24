const router = require('express').Router();
const userController = require('../Controllers/user.controller');
const { verifyAccessToken } = require('../helpers/jwt_services');

//REGISTER USER
router.post('/register', userController.registerUser);

//LOGIN USER
router.post('/login', userController.loginUser);

//REFRESH TOKEN
router.post('/refresh-token', userController.refreshToken);

//GET ALL USER
router.get('/', userController.getAllUser);

//GET ONE USER
router.get('/:id', userController.getOneUser);

//DELETE USER
router.delete('/:id', userController.deleteUser);

//UPDATE USER
router.put('/:id', userController.updateUser);

//ADD Order
router.put('/add-order/:id', userController.addOrder);

module.exports = router;
