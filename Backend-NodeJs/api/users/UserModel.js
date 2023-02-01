var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Please provide an unique email"],
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    firstname: String,
    lastname: String,
    username: String,
    age: Number,
    permission: {
        type: String,
        enum: ["admin", "regular_user"],
        default: "regular_user"
    },
    created: Date,
    updated: Date,
    passwordChangedAt:Date,
    shifts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "project_shifts", 
        }
    ]
});

UserSchema.pre("save", function (next){
    if (!this.isModified("password")) {
      return next();
    };

    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});


UserSchema.methods = {
    authenticate: function(textPassword){
        return bcrypt.compareSync(textPassword, this.password);
    },
    changePasswordAfter: function (JWTTimeStamp){
        if (this.changePasswordAt) {
          let changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
          return JWTTimeStamp < changedTimeStamp;
        }
        return false; //password didn’t change
    },
    createNewPasswordToken: function () {
        let str = "abcdefghijklmnopqrstuvwzyz1234567890";
        this.passwordResetToken = "";
        for (var i = 0; i < 40; i++) {
          let n = Math.floor(Math.random() * (str.length - 1));
          this.passwordResetToken += str[n];
        }
        this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // half hour
        return this.passwordResetToken;
    },
    matchPassword: function(pass){
        if(bcrypt.compareSync(pass, this.password)){
            return true;
        }
        return false;   
    },
    toJson: function(){
        let obj = this.toObject();
        delete obj.password;
        return obj;
    }
};

module.exports = mongoose.model("project_users", UserSchema);