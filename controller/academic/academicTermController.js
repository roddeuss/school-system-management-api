const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin")
const AcademicTerm = require("../../model/academic/AcademicTerm")

// create academic term
exports.createAcademicTerm = AsyncHandler (async(req, res) => {
    const {name, description, duration} = req.body;
    //check if exist
    const academicTerm = await AcademicTerm.findOne({name});
    if(academicTerm) {
        throw new Error('Academic Term already exists')
    }
    //create 
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerm.push(academicTermCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic Term created successfully",
        data: academicTermCreated,
    });
});

// get all academic term
exports.getAcademicTerm = AsyncHandler (async(req, res) => {
    const academicTerm = await AcademicTerm.find();

    res.status(201).json({
        status: "success",
        message: "Academic Term fetched successfully",
        data: academicTerm,
    });
});

// get single academic term
exports.getSingleAcademicTerm = AsyncHandler (async(req, res) => {
    const academicTerm = await AcademicTerm.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Academic Term fetched successfully",
        data: academicTerm,
    });
});

// update academic term
exports.updateAcademicTerm = AsyncHandler (async(req, res) => {
    const {name, description, duration} = req.body;
    //check name exists
    const createAcademicTermFound = await AcademicTerm.findOne({name})
    if(createAcademicTermFound) {
        throw new Error('Academic Term Already Exists')
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id,
        {
            name,
            description,
            duration
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Academic Term Update successfully",
        data: academicTerm,
    });
});

// delete academic year
exports.deleteAcademicTerm = AsyncHandler (async(req, res) => {
    await AcademicTerm.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Academic Term Deleted successfully",
    });
});

