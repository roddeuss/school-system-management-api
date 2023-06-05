const express = require('express');
const { checkExamResult , getAllExamResults } = require('../../controller/academic/examResultsController');
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin');

const examResultsRouter = express.Router();

examResultsRouter.get('/',isStudentLogin,isStudent, getAllExamResults)
examResultsRouter.get('/:id/checking',isStudentLogin,isStudent, checkExamResult)

module.exports = examResultsRouter