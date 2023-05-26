const AsyncHandler = require("express-async-handler");
const Subject = require("../../model/academic/Subject")
const Program = require("../../model/academic/Program")

// create subject
exports.createSubject = AsyncHandler (async(req, res) => {
    const {name, description, academicTerm} = req.body;
    //find the program
    const programFound = await Program.findById(req.params.programID)
    if(!programFound) {
        throw new Error('Program not Found')
    }
    //check if exist
    const subjectFound = await Subject.findOne({name});
    if(subjectFound) {
        throw new Error('Subject already exists')
    }
    //create 
    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });
    //push to the program
    programFound.subjects.push(subjectCreated._id)
    //save
    await programFound.save();
    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subjectCreated,
    });
});

// get all subject
exports.getSubject = AsyncHandler (async(req, res) => {
    const classes = await Subject.find();

    res.status(201).json({
        status: "success",
        message: "All Subject fetched successfully",
        data: classes,
    });
});

// get single Program 
exports.getSingleSubject = AsyncHandler (async(req, res) => {
    const classes = await Subject.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "One Subject fetched successfully",
        data: classes,
    });
});

// update subject 
exports.updateSubject = AsyncHandler (async(req, res) => {
    const {name, description, academicTerm} = req.body;
    //check name exists
    const subjectFound = await Subject.findOne({name})
    if(subjectFound) {
        throw new Error('Subject Already Exists')
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id,
        {
            name,
            description,
            academicTerm,
            createdBy: req.userAuth._id
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Subject Update successfully",
        data: subject,
    });
});

// delete subject
exports.deleteSubject = AsyncHandler (async(req, res) => {
    await Subject.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Subject Deleted successfully",
    });
});

