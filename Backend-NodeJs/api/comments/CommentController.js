var CurrentComment = require('./CommentModel');
var CurrentShift = require('../shifts/ShiftModel');


//This function is used to create a new comment on a shift, based on the fields described in Comment Schema. 
//Req URL: localhost:4000/api/comment
//HTTP Method: POST
//Req Body: {"description":"Test!!!!!!!!!!!!!!!""userId":"6255cda8d591ba455de11dfe","shift": "6255d41ad591ba455de11e01"}
exports.createComment = async function(req, res, next){
    let comment = req.body;
    let newComment = await CurrentComment.create(comment);
    let id = req.body.shift

    newComment.save().then((comment) => {
        CurrentShift.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err) => {
            if(err){
                res.status(400).json({
                    success: false,
                    msg: err
                })
            };
            res.status(200).json({
                success: true,
                data: comment
            });
        });
    });
};

//This function is used to get all the comments stored in project_comments collection. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/comment
//HTTP Method: GET
//Req Body: -
exports.getAllComments = async function(req, res, next){
    CurrentComment.find({}).then(function(data){
        res.status(200).json({
            status: "success",
            data: data
        });
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

//This function is used to get a certain comment stored in project_comments collection, using an ID.
//Req URL: localhost:4000/api/comment/6255cda8d591ba455de11dfe
//HTTP Method: GET
//Req Body: - 
exports.getCommentById = function(req, res, next){
    let id = req.params.id;
    CurrentComment.find({_id: id}).then(function(data){
        res.status(200).json({
            status: "success",
            data: data
        });
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

//This function is used to update a certain comment stored in project_comments collection, using an ID.
//Req URL: localhost:4000/api/comment/6255d43ad591ba455de11e05
//HTTP Method: PATCH
//Req Body: {description: "Test!!!!!!!!!!!!!!!123"}
exports.updateCommentById = function(req, res, next){
    let id = req.params.id;
    CurrentComment.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).then(function(data){
        res.status(200).json({
            status: "success",
            data: data
        })
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

//This function is used to delete a certain comment stored in project_comments collection, using an ID. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/comment/6239a7a23933295e948259fc
//HTTP Method: DELETE
//Req Body: -
exports.deleteCommentById = function(req, res, next){
    let id = req.params.id;
    CurrentComment.findByIdAndDelete(id).then(function(data){
        res.status(200).json({
            status: "success",
            data: null
        })
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};


//This function is used to get all comments made by a specific userId. 
//Req URL: localhost:4000/api/comment/getCommentCreatedByUserId/623481db48ddf18110e386f6
//HTTP Method: GET
//Req Body: -
exports.getCommentCreatedByUserId = function(req, res, next){
    let userId = req.params.id;
    CurrentComment.find({userId: userId}).then(function(data){
        res.status(200).json({
            status: "success",
            data: data
        });
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

exports.getCommentForShift = function(req, res, next){
    let shiftId = req.params.id;
    CurrentComment.find({shiftId: shiftId}).then(function(data){
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};


