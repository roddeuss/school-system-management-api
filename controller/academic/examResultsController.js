const AsyncHandler = require("express-async-handler");
const ExamResults = require('../../model/academic/ExamResults');
const Student = require('../../model/academic/Student');

// get all exam results 
exports.getAllExamResults = AsyncHandler(async(req, res) => {
    const results = await ExamResults.find().select('exam').populate('exam')
    res.status(200).json({
        status: 'success',
        message: 'successfully get all exam results',
        data: results
    })
})

//check exam result
exports.checkExamResult = AsyncHandler(async (req, res) => {
    // find the student
    const studentFound = await Student.findById(req.userAuth?._id);
    if (!studentFound) {
        throw new Error('Student not found');
    }

    // find the exam result
    const examResultFound = await ExamResults.findOne({
        studentID: studentFound?.studentId,
        _id: req.params.id,
    })
        .populate({
            path: 'exam',
            populate:{
                path: 'questions'
            }
        })
        .populate('classLevel')
        .populate('academicTerm')
        .populate('academicYear');

    // check if exam result is published
    if (!examResultFound?.isPublished) {
        throw new Error('Exam Result is not available, check back later!');
    }

    res.json({
        status: 'success',
        message: 'Exam Result',
        data: examResultFound,
        student: studentFound,
    });
});