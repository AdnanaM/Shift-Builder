let userModel = require('./UserModel');
const { promisify } = require("util");
let jwt = require('jsonwebtoken');
let config = require('../config');
let sendEmail = require("../users/Email");

let userLogged 
console.log(userLogged)




//This function is used to signup a new user based on the fields described in User Schema. 
//Req URL: localhost:4000/api/user/signup
//HTTP Method: POST
//Req Body: {"email": "test@mail.com", "password": "test123", "firstname": "test", "lastname": "test","created": "05/03/2022"}
exports.signup = function(req, res, next){
    let new_user = new userModel(req.body);
    new_user.save().then(function(user){
        let token = jwt.sign(
            {
                id: user._id
            }, 
            config.secrets.jwt, 
            {
                expiresIn: config.expireTime
            }
        );
        res.status(201).json({
            status: "success",
            token,
            user: user
        })
    }).catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};


//This function is used to login a user. If the login is successfull will get a token. 
//Req URL: localhost:4000/api/user/login
//HTTP Method: POST
//Req Body: {"email": "test@mail.com", "password": "test123"}
exports.login = function(req, res, next){
    let {email, password} = req.body;

    if(!email || !password){
        res.status(400).send('Please provide email and password!');
        return;
    };

    userModel.findOne({email: email}).then(function(user){
        if(!user){
            res.status(401).send("No user found!");
            return;
        }else{
            if(!user.authenticate(password)){
                res.status(401).send("Wrong password!");
                return;
            }else{
                userLogged = user
                let token = signToken(user._id);
                res.status(200).json({
                    status: "succes",
                    token: token,
                    user: user
                });
            };
        };
    });
};

exports.getUser = async function(req, res, next){
    res.status(200).send(userLogged)
    res.end()
};

exports.logout = async function(req, res, next){
    userLogged = undefined
    res.status(200).send(userLogged)
    res.end()
}


//Signs the token with the secret from config.js file
let signToken = id => {
    return jwt.sign(
        {
            id: id
        },
        config.secrets.jwt,
        {
            expiresIn: config.expireTime
        }
    );
};

//This function takes the token and verifies it.
exports.protectSystem = async function(req, res, next){
    //Get Token 
    let token = "";
    let arrAuthorization = req.headers.authorization;
    if(arrAuthorization){
        arrAuthorization = req.headers.authorization.split(" ");
        if(arrAuthorization[0] == "Bearer" && arrAuthorization[1]){
            token = arrAuthorization[1];
        };
    };

    if(!token){
        res.status(401).json({
            fail: "You are not logged in!"
        });
        return;
    };

    //Verifying token
    let decode = "";
    try{
        decode = await promisify(jwt.verify)(token, config.secrets.jwt);
    }catch(err){
        res.status(401).json({
            fail: "Verification token failed. Please login again!" + err
        });
        return;
    };

    //check if user exists
    let currentUser = await userModel.findById(decode.id);
    if(!currentUser){
        res.status(401).json({
            fail: "You are not logged in. Please login!"
        });
        return;
    };
    
    //check if user changed password
    if(currentUser.changePasswordAfter(decode.iat)){
        res.status(401).json({
            fail: "You changed your password. Please login again!"
        });
        return;
    };

    req.user = currentUser;
    next();
}


//This function verifies if the user is a regular_user or admin. A regular_user has limited permissions.
exports.isAdmin = function (req, res, next) {
    if (req.user && req.user.permission && req.user.permission == "admin") {
      next();
    } else {
      res.status(401).json({
        message: "you don’t have permission",
      });
    }
};


//This function gets the email from req.body and sends the email with the URL and reset token. 
//Req.Url: localhost:4000/api/user/forgotPassword
//HTTP Method: POST
//Req.body: {"email": "newregularuser@mail.com"}
exports.forgotPassword = async function(req, res, next){
    let user = await userModel.findOne({
        email: req.body.email
    });

    if(!user){
        res.status(404).json({
            message: "Please type your email!"
        });
        return;
    };

    try{
        let resetToken = user.createNewPasswordToken();
        await user.save({validateBeforeSave: false});
        let resetUrl = req.protocol + ":/" + req.get("host") + "/api/user/resetPassword/" + resetToken;
        let message = "Click here to change your password " + resetUrl;

        await sendEmail({
            email: user.email,
            subject: "Your password reset token",
            message
        });
        res.status(200).json({
            status: "succes",
            message: "Token sent to your email!"
        });
    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        res.status(500).json({
            status: "failed",
            message: "error sending email",
        });
    };
};


//Req.Url: localhost:4000/api/user/resetPassword/:token
//HTTP Method: PATCH
//Req.body: {password: 123456}
exports.resetPassword = async function(req, res, next){
    let user = await userModel.findOne({
        passwordResetToken: req.params.token,
        passwordResetExpires: {$gt: Date.now()}
    });

    if (!user) {
        res.status(404).json({
          status: "failed",
          message: "Invalid token",
        });
    };

    user.password = req.body.password;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    let token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token: token,
    });
};


//Req.Url: localhost:4000/api/user/updatePassword/62347e657b6bfe0d2e2d8832
//HTTP Method: PATCH
//Req.body: {"currentPassword": "newregularuser123456", "password": "123456"}
exports.updatePassword = async function(req, res, next){
    let id = req.params.id
    let user = await userModel.findById(id);
    if(!await user.matchPassword(req.body.currentPassword)){
        req.status(401).json({
            status:"failed",
            message:"Incorect password!"       
        })
        return;
    };

    user.password = req.body.password;
    await user.save();

    let token = signToken(user._id)
    res.status(200).json({
        status:"success",
        messagge: "Password changed with succes!:)",
        token:token   
    });
};