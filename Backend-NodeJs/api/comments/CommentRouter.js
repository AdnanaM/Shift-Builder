var express = require('express');
var commentRouter = express.Router();
var commentController = require('./CommentController');
var authController = require('../users/AuthController');

commentRouter.post('/', commentController.createComment);
commentRouter.get('/', authController.protectSystem, authController.isAdmin, commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.patch('/:id', commentController.updateCommentById);
commentRouter.delete('/:id', authController.protectSystem, authController.isAdmin, commentController.deleteCommentById);
commentRouter.get('/getCommentCreatedByUserId/:id', commentController.getCommentCreatedByUserId);
commentRouter.get('/getCommentForShift/:id', commentController.getCommentForShift);



module.exports = commentRouter;

