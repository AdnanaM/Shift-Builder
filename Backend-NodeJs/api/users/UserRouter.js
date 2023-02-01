var express = require('express');
var userRouter = express.Router();
var userController = require("./UserController");
var authController = require('./AuthController');


userRouter.post("/", userController.createUser);
userRouter.get('/getUser', authController.getUser);
userRouter.post('/logout', authController.logout);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.patch('/:id', userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);


userRouter.post('/login', authController.login);
userRouter.post('/signup', authController.signup);
// userRouter.post('/logout', authController.logout)


userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch("/updatePassword/:id", authController.updatePassword);

module.exports = userRouter;
