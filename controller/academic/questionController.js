const AsyncHandler = require("express-async-handler");
const Question = require('../../model/academic/Question')
const Exam = require('../../model/academic/Exam')
const Teacher = require('../../model/staff/Teacher')



// create question for exam
exports.createQuestion = AsyncHandler(async(req, res) => {
    const {question, optionA, optionB, optionC, optionD, correctAnswer} = req.body;
    //find the exam
    const examFound = await Exam.findById(req.params.examID);
    if(!examFound) {
        throw new Error('Exam not found');
    }
    //check if question a same
    const questionExists = await Question.findOne({question});
    if(questionExists) {
        throw new Error('Question already exists');
    }
    //create
    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        createdBy: req.userAuth._id,
    });
    //add the question
    examFound.questions.push(questionCreated?._id);
    //save
    await examFound.save();
    res.status(201).json({
        status: 'success',
        message: 'Question Created',
        data: questionCreated
    })
});

// get all question 
exports.getAllQuestions = AsyncHandler(async(req, res) => {
    const questions = await Question.find();
    res.status(201).json({
        status: 'success',
        message: 'All Question fetched successfully',
        data: questions
    })
});

exports.getSingleQuestions = AsyncHandler(async(req, res) => {
    const questions = await Question.findById(req.params.id);
    res.status(201).json({
        status: 'success',
        message: 'One Question fetched successfully',
        data: questions
    })
});

//update a questions
exports.updateQuestions = AsyncHandler(async(req, res) => {
    const {question, optionA, optionB, optionC, optionD, correctAnswer} = req.body;
    //check the name exists
    const questionFound = await Question.findOne({name});
    if(questionFound) {
        throw new Error('Question already exists')
    }
    const updateQuestion = await Question.findByIdAndUpdate
    (req.params.id, 
        {
            question, optionA, optionB, optionC, optionD, correctAnswer, createdBy: req.userAuth._id
        },
        {
            new: true
        }
    );
    res.status(201).json({
        status: 'success',
        message: 'Update Question successfully',
        data: updateQuestion
    });
});