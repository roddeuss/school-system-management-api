const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin")
const ClassLevel = require("../../model/academic/ClassLevel")

// create class level
exports.createClassLevel = AsyncHandler (async(req, res) => {
    const {name, description} = req.body;
    //check if exist
    const classFound = await ClassLevel.findOne({name});
    if(classFound) {
        throw new Error('Class already exists')
    }
    //create 
    const classLevelCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    //push class into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevel.push(classLevelCreated._id);
    //save
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Class created successfully",
        data: classLevelCreated,
    });
});

// get all academic term
exports.getClassLevel = AsyncHandler (async(req, res) => {
    const classLevel = await ClassLevel.find();

    res.status(201).json({
        status: "success",
        message: "Class fetched successfully",
        data: classLevel,
    });
});

// get single academic term
exports.getSingleClassLevel = AsyncHandler (async(req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "One Class fetched successfully",
        data: classLevel,
    });
});

// update academic term
exports.updateClassLevel = AsyncHandler (async(req, res) => {
    const {name, description} = req.body;
    //check name exists
    const classLevelFound = await ClassLevel.findOne({name})
    if(classLevelFound) {
        throw new Error('Class Already Exists')
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(req.params.id,
        {
            name,
            description,
            createdBy: req.userAuth._id
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Class Update successfully",
        data: classLevel,
    });
});

// delete academic year
exports.deleteClassLevel = AsyncHandler (async(req, res) => {
    await ClassLevel.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Class Deleted successfully",
    });
});

