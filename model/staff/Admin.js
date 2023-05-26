    const bcrypt = require('bcryptjs')

    const mongoose = require('mongoose');
    const adminSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }, 
            password: {
                type: String,
                required: true
            },
            role: {
                type: String,
                default: "admin"
            },
            academicTerm: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm",
            }],
            program: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program",
            }],
            yearGroup: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "YearGroup",
            }],
            academicYears: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicYear",
            }],
            classLevel: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassLevel",
            }],
            teacher: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            }],
            student: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]
        },
        {
            timestamps: true,
        }
    );

    //model
    const Admin = mongoose.model("Admin", adminSchema);

    module.exports = Admin;
