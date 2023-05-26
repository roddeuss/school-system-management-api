const mongoose = require("mongoose");

const {Schema} = mongoose;

const SubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher"
        },
        academicTerm: {
            type: Schema.Types.ObjectId,
            ref: "AcademicTerm",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 months",
        }
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model("subject", SubjectSchema);

module.exports = Subject;