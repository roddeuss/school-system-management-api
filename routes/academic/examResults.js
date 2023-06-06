const express = require('express');
const { checkExamResult , getAllExamResults, adminToggleExamResults } = require('../../controller/academic/examResultsController');
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin');
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const examResultsRouter = express.Router();

examResultsRouter.get('/',isStudentLogin,isStudent, getAllExamResults)
examResultsRouter.get('/:id/checking',isStudentLogin,isStudent, checkExamResult)
examResultsRouter.put('/:id/admin-toggle-publish', isLogin, isAdmin, adminToggleExamResults)

module.exports = examResultsRouter