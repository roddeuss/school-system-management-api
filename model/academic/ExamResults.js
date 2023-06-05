const mongoose = require("mongoose");

const { Schema } = mongoose;

const examResultsSchema = new Schema(
    {
        studentID: {
            type: String,
            required: true,
        },
        exam: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
        },
        grade: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        passMark: {
            type: Number,
            required: true,
            default: 50
        },
        answeredQuestions: [
            {
                type: Object
            },
        ],
        status: {
                type: String,
                requried: true,
                enum: ["Pass", "Fail"],
                default: "Fail"
        },
        remarks: {
            type: String,
            required: true,
            enum: ["Excellent", "Very Good", "Good", "Poor"]
        },
        classLevel: {
            type: Schema.Types.ObjectId,
            ref: "ClassLevel"
        },
        academicTerm: {
            type: Schema.Types.ObjectId,
            ref: "AcademicTerm"
        },
        academicYear: {
            type: Schema.Types.ObjectId,
            ref: "AcademicYear"
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
)

const ExamResults = mongoose.model("ExamResult", examResultsSchema);

module.exports = ExamResults;