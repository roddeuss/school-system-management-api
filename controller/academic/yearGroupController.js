const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin")
const YearGroup = require("../../model/academic/YearGroup")
const Program = require("../../model/academic/Program")

// create year group
exports.createYearGroup = AsyncHandler (async(req, res) => {
    const {name, academicYear} = req.body;
    //check year group if the exists
    const yearGroupFound = await YearGroup.findOne({name})
    if(yearGroupFound) {
        throw new Error('Year Group already exists')
    }
    //create 
    const yearGroupCreate = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
    });
    // find the admin
    const admin = await Admin.findById(req.userAuth._id)
    if(!admin) {
        throw new Error('Admin not found')
    }
    //push year group into admin
    admin.yearGroup.push(yearGroupCreate._id)
    //save
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Year Group created successfully",
        data: yearGroupCreate,
    });
});

// get all year group
exports.getYearGroup = AsyncHandler (async(req, res) => {
    const yearGroup = await YearGroup.find();

    res.status(201).json({
        status: "success",
        message: "All Year Group fetched successfully",
        data: yearGroup,
    });
});

// get single year group 
exports.getSingleYearGroup = AsyncHandler (async(req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "One Year Group fetched successfully",
        data: yearGroup,
    });
});

// update year group 
exports.updateYearGroup = AsyncHandler (async(req, res) => {
    const {name, academicYear} = req.body;
    //check name exists
    const yearGroupFound = await YearGroup.findOne({name})
    if(yearGroupFound) {
        throw new Error('Year Group Already Exists')
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id,
        {
            name,
            academicYear,
            createdBy: req.userAuth._id
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Year Group Update successfully",
        data: yearGroup,
    });
});

// delete year group
exports.deleteYearGroup = AsyncHandler (async(req, res) => {
    await YearGroup.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Year Group Deleted successfully",
    });
});

