const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        fromYear: {
            type: Date,
            required: true,
        },
        toYear: {
            type: Date,
            required: true
        },
        isCurrent: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },
        student: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            }
        ],
        teacher: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Teacher",
            }
        ],
        //finance
        // librarian
        // ..... 
    },
    {
        timestamps: true
    }
);

const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);

module.exports = AcademicYear;