const mongoose = require("mongoose");

const YearGroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const YearGroup = mongoose.model("YearGroup", YearGroupSchema);

module.exports = YearGroup;