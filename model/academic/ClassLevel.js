const mongoose = require("mongoose");

const {Schema } = mongoose;

const ClassLevelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            name: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        student: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            }
        ],
        subject: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject"
            }
        ],
        teacher: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            }
        ]
    },
    {
        timestamps: true
    },
);


const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

module.exports = ClassLevel;