var express = require('express');
var shiftRouter = express.Router();
var shiftController = require("./ShiftController");
var authController = require('../users/AuthController');

shiftRouter.get("/search", shiftController.searchShifts)
shiftRouter.post("/", shiftController.addShift);
shiftRouter.get("/", shiftController.getAllShifts);
shiftRouter.get("/:id", shiftController.getShiftById);
shiftRouter.patch("/:id", shiftController.updateShiftById);
shiftRouter.delete("/:id", shiftController.deleteShiftById);

shiftRouter.get('/getAllShiftCreatedByUserId/:id', shiftController.getAllShiftCreatedByUserId)



module.exports = shiftRouter;