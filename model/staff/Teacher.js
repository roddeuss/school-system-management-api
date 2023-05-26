const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dataEmployed: {
            type: String,
            default: Date.now,
        },
        teacherId: {
            type: String,
            required: true,
            default: function() {
                return(
                    "TEA" + 
                    Math.floor(100 + Math.random() * 900) + 
                    Date.now().toString().slice(2, 4) +
                    this.name
                    .split(" ")
                    .map(name => name[0])
                    .join("")
                    .toUpperCase()
                );
            },
        },
        isWithdrawn: {
            type: Boolean,
            default: false,
        },
        isSuspended: {
            type: String,
            default: false,
        },
        role: {
            type: String,
            default: "teacher"
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            // required: true,
        },
        applicationStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        program: {
            type: String,
        },
        classLevel: {
            type: String,
        },
        academicYear: {
            type: String,
        },
        examsCreated: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            // required: true,
        },
        academicTerm: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Teacher = mongoose.model("Teacher", TeacherSchema)

module.exports = Teacher