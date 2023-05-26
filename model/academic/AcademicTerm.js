const mongoose = require("mongoose");

const academicTermSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true,
            default: "3 months"
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "Admin",
            required: true
        }
    },
    {
        timestamps: true
    },
);

const AcademicTerm = mongoose.model("AcademicTerm", academicTermSchema);

module.exports = AcademicTerm