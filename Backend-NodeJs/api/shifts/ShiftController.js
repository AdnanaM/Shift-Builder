var CurrentShift = require("./ShiftModel");
var CurrentUser = require("../users/UserModel");

//This function is used to create a new shift based on the fields described in Shift Schema. 
//Req URL: localhost:4000/api/shift
//HTTP Method: POST
//Req Body: {"userId": "6255cda8d591ba455de11dfe","start": "08:00:00","end": "16:00:00","per_hour": "200","place": "Hybrid","created": "06/03/2022"}
exports.addShift = async function(req, res, next){
    let shift = req.body;
    let newShift = await CurrentShift.create(shift);
    let id = req.body.userId;
    let shift_name = req.body.shift_name

    newShift.save().then((shift) => {
        CurrentUser.findByIdAndUpdate(id, {$push: {shifts: shift._id, shift_name}}, (err) => {
            if(err){
                res.status(400).json({
                    success: false,
                    msg: err
                })
            };
            res.status(200).json({
                success: true,
                data: shift
            });
        });
    }); 
};

        


//This function is used to get all the shifts stored in project_shifts collection. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/shift
//HTTP Method: GET
//Req Body: -
exports.getAllShifts = async function(req, res, next){
    CurrentShift.find().populate({path: 'userId', select: '_id email'}).populate({path: 'comments', select: '-userId -shift -__v'}).then(function(data){
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

//This function is used to get a certain shift stored in project_shifts collection, using an ID.
//Req URL: localhost:4000/api/shift/6255cda8d591ba455de11dfe
//HTTP Method: GET
//Req Body: - 
exports.getShiftById = function(req, res){
    let id = req.params.id;
    CurrentShift.find({_id: id}).populate({path: 'userId', select: '_id email'}).populate({path: 'comments', select: '-userId -shift -__v'}).then(function(data){
        res.status(200).json({
            data: data[0]
        });
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

//This function is used to update a certain shift stored in project_shifts collection, using an ID.
//Req URL: localhost:4000/api/shift/6255cda8d591ba455de11dfe
//HTTP Method: PATCH
//Req Body: {start: 10:00:00}
exports.updateShiftById = function(req, res, next){
    let id = req.params.id;
    CurrentShift.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate({path: 'userId', select: '_id email'}).populate({path: 'comments', select: '-userId -shift -__v'}).then(function(data){
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

//This function is used to delete a certain shift stored in project_shifts collection, using an ID. Tip: Only admin has permission to do this action, a regular_user will get an error message. 
//Req URL: localhost:4000/api/shift/6239a576c8c7d1692dd5dcd0
//HTTP Method: DELETE
//Req Body: -
exports.deleteShiftById = function(req, res, next){
    let id = req.params.id;
    CurrentShift.findByIdAndDelete(id).then(function(data){
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


exports.getAllShiftCreatedByUserId = function(req, res, next){
    let userId = req.params.id;
    CurrentShift.find({userId: userId}).then(function(data){
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(404).json({
            status: "fail",
            messagge: err
        });
    });
};

exports.searchShifts = function(req, res) {
	var term = req.query.search
    var result = []
    CurrentShift.find().then(function(data){
        var shifts = data
        var shiftsInfo = Object.values(shifts)

        for(let i = 0; i < shiftsInfo.length; i++){
            if(shiftsInfo[i].shift_name === term){
                result.push(shiftsInfo[i])
                res.status(200).send(result)
                return
            }
        }
    })
}

