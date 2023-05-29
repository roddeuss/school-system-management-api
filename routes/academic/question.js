const express = require('express');
const isTeacher = require('../../middlewares/isTeacher')
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const { createQuestion, getAllQuestions, getSingleQuestions, updateQuestions } = require('../../controller/academic/questionController');

const questionRouter = express.Router();

questionRouter.post("/:examID", isTeacherLogin,isTeacher, createQuestion)
questionRouter.get("/", isTeacherLogin,isTeacher, getAllQuestions)
questionRouter.get("/:id", isTeacherLogin,isTeacher, getSingleQuestions)
questionRouter.put("/:id", isTeacherLogin,isTeacher, updateQuestions )


module.exports = questionRouter; 