const mongoose = require("mongoose");

const { Schema } = mongoose;

const examResultSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        exam: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
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
        status: {
                type: String,
                requried: true,
                enum: ["failed", "passed"],
                default: "failed"
        },
        remark: {
            type: String,
            required: true,
            enum: ["excelent", "good", "poor"]
        },
        position: {
            type: Number,
            required: true
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject"
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

const ExamResult = mongoose.model("ExamResult", examResultSchema);

module.exports = ExamResult;