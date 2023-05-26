const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin")
const Program = require("../../model/academic/Program")

// create program
exports.createProgram = AsyncHandler (async(req, res) => {
    const {name, description} = req.body;
    //check if exist
    const programFound = await Program.findOne({name});
    if(programFound) {
        throw new Error('Program already exists')
    }
    //create 
    const programCreated = await Program.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    //push program into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.program.push(programCreated._id);
    //save
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Program created successfully",
        data: programCreated,
    });
});

// get all program
exports.getProgram = AsyncHandler (async(req, res) => {
    const program = await Program.find();

    res.status(201).json({
        status: "success",
        message: "All Program fetched successfully",
        data: program,
    });
});

// get single Program 
exports.getSingleProgram = AsyncHandler (async(req, res) => {
    const program = await Program.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "One Program fetched successfully",
        data: program,
    });
});

// update program 
exports.updateProgram = AsyncHandler (async(req, res) => {
    const {name, description} = req.body;
    //check name exists
    const programFound = await Program.findOne({name})
    if(programFound) {
        throw new Error('Program Already Exists')
    }
    const program = await Program.findByIdAndUpdate(req.params.id,
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
        message: "Program Update successfully",
        data: program,
    });
});

// delete program 
exports.deleteProgram = AsyncHandler (async(req, res) => {
    await Program.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Program Deleted successfully",
    });
});

