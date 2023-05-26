const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/academic/AcademicYear")
const Admin = require("../../model/staff/Admin")

// create academic year
exports.createAcademicYears = AsyncHandler (async(req, res) => {
    const {name, fromYear, toYear} = req.body;
    //check if exist
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear) {
        throw new Error('Academic Year already exists')
    }
    //create 
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYearCreated,
    });
});

// get all academic year
exports.getAcademicYears = AsyncHandler (async(req, res) => {
    const academicYears = await AcademicYear.find();

    res.status(201).json({
        status: "success",
        message: "Academic year fetched successfully",
        data: academicYears,
    });
});

// get single academic year
exports.getSingleAcademicYear = AsyncHandler (async(req, res) => {
    const academicYears = await AcademicYear.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Academic year fetched successfully",
        data: academicYears,
    });
});

// update academic year
exports.updateAcademicYear = AsyncHandler (async(req, res) => {
    const {name, fromYear, toYear} = req.body;
    //check name exists
    const createAcademicYearFound = await AcademicYear.findOne({name})
    if(createAcademicYearFound) {
        throw new Error('Academic Year Already Exists')
    }
    const academicYears = await AcademicYear.findByIdAndUpdate(req.params.id,
        {
            name,
            fromYear,
            toYear
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Academic year Update successfully",
        data: academicYears,
    });
});

// delete academic year
exports.deleteAcademicYear = AsyncHandler (async(req, res) => {
    await AcademicYear.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Academic year Deleted successfully",
    });
});

