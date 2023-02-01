var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ShiftSchema = new Schema({
    start: String,
    end: String,
    price: Number,
    place: String,
    created: String,
    update: Date,
    shift_name: String,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "project_users",
    },
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "project_comments",
        }
    ],
});


module.exports = mongoose.model("project_shifts", ShiftSchema);