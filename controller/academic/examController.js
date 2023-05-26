const Exam = require("../../model/academic/Exam");
const Teacher = require("../../model/staff/Teacher");
const AsyncHandler = require("express-async-handler");

// create a exam
exports.createExam = AsyncHandler(async (req, res) => {
    const {name, description, subject, program, classLevel, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear} = req.body;

    //find the teacher
    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if (!teacherFound) {
        throw new Error('Teacher not found');
    }

    //check if exam already exists
    const examExists = await Exam.findOne({name});
    if (examExists) {
        throw new Error('Exam already exists');
    }

    // create exam
    const examCreated = await new Exam({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examTime,
        examType,
        subject,
        program,
        createdBy: req.userAuth?._id,
    });

    //push the exam into teacher
    teacherFound.examsCreated.push(examCreated._id);

    //save exam and teacher
    await examCreated.save();
    await teacherFound.save();

    res.status(201).json({
        status: 'success',
        message: 'Exam Created',
        data: examCreated
    });
});

// get all exam
exports.getAllExam = AsyncHandler(async(req, res) => {
    const exams = await Exam.find();
    res.status(201).json({
        status: 'success',
        message: 'Exam Fetched Successfully',
        data : exams
    });
});

//get single exam
exports.getSingleExam = AsyncHandler(async(req, res) => {
    const exams = await Exam.findById(req.params.id);
    res.status(201).json({
        status: 'success',
        message: 'Exam Fetched Successfully',
        data : exams
    });
});

//update exam
exports.updateExam = AsyncHandler (async(req, res) => {
    const {name, description, subject, program, classLevel, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear} = req.body;
    //check name exists
    const examFound = await Exam.findOne({name})
    if(examFound) {
        throw new Error('Exam Already Exists')
    }
    const examUpdated = await Exam.findByIdAndUpdate(req.params.id,
        {
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examTime,
        examType,
        subject,
        program,
        createdBy: req.userAuth?._id,
        },
        {
            new: true,

        }
        );

    res.status(201).json({
        status: "success",
        message: "Exam Update successfully",
        data: examUpdated,
    });
}); 

// delete exam
exports.deleteExam = AsyncHandler (async(req, res) => {
    await Exam.findByIdAndDelete(req.params.id)
    res.status(201).json({
        status: "success",
        message: "Exam Deleted successfully",
    });
});


