var express = require('express');
var app = express();
app.use(express.json());
var mongoose = require('mongoose');

var userRouter = require('./api/users/UserRouter');
var shiftRouter = require('./api/shifts/ShiftRouter');
var commentRouter = require('./api/comments/CommentRouter');

app.use('/api/user', userRouter);
app.use('/api/shift', shiftRouter);
app.use('/api/comment', commentRouter);



const strConnect =
  "mongodb+srv://adnana:altaparola123@cluster0.zacci.mongodb.net/projectDatabase?retryWrites=true&w=majority";
const OPT = { useNewUrlParser: true };

mongoose.connect(strConnect, OPT, function () {
    console.log("connected");
});
  
var port = 4000;
app.listen(port, function () {
  console.log("Running on port " + port);
});