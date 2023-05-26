const express = require("express");
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher');
const { createExam, getAllExam, getSingleExam, updateExam, deleteExam } = require('../../controller/academic/examController');

const examRouter = express.Router();

examRouter.post("/",isTeacherLogin,isTeacher, createExam);
examRouter.get("/",isTeacherLogin,isTeacher, getAllExam);
examRouter.get("/:id",isTeacherLogin,isTeacher, getSingleExam);
examRouter.put("/:id",isTeacherLogin,isTeacher, updateExam);
examRouter.delete("/:id",isTeacherLogin,isTeacher, deleteExam);

module.exports = examRouter;