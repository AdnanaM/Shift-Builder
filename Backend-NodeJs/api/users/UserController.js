var CurrentUser = require('./UserModel');

//This function is used to create a new user based on the fields described in User Schema. 
//Req URL: localhost:4000/api/user
//HTTP Method: POST
//Req Body: {"email": "test@mail.com", "password": "test123", "firstname": "test", "lastname": "test","created": "05/03/2022"}
exports.createUser = async function(req, res, next){
    try{
        let user = req.body;
        let newUser = await CurrentUser.create(user);
        res.status(201).json({
            status: "user created!",
            data: newUser
        })
    }
    catch(err){
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    };
};


//This function is used to get all the users stored in project_users collection. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/user
//HTTP Method: GET
//Req Body: - 
exports.getAllUsers = async function(req, res, next){
    CurrentUser.find({}).populate({path: 'shifts', select: 'start end place'}).then(function(data){
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(404).json({
          status: "fail",
          messagge: err
        });
    });
};


//This function is used to get a certain user stored in project_users collection, using an ID.
//Req URL: localhost:4000/api/user/62345c34111da26dba9abc01
//HTTP Method: GET
//Req Body: - 
exports.getUserById = function(req, res, next){
    let id = req.params.id;
    CurrentUser.find({_id: id}).populate({path: 'shifts', select: 'start end created'}).then(function(data){
        res.status(200).json({
            status: "succes",
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


//This function is used to update a certain user stored in project_users collection, using an ID.
//Req URL: localhost:4000/api/user/6255cda8d591ba455de11dfe
//HTTP Method: PATCH
//Req Body: {firstname: Jane}
exports.updateUserById = function(req, res, next){
    // let password = req.body.password;
    // if(password){
    //     res.status(400).json({
    //         status: "failed",
    //         message: "You cannot change the password from here"
    //     });
    //     return
    // };
    

    let id = req.params.id;
    CurrentUser.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate({path: 'shifts', select: 'start end place'}).then(function(data){
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


//This function is used to delete a certain user stored in project_users collection, using an ID. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/user/62345c34111da26dba9abc01
//HTTP Method: DELETE
//Req Body: -
exports.deleteUserById = function(req, res, next){
    let id = req.params.id;
    CurrentUser.findByIdAndDelete(id).then(function(data){
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