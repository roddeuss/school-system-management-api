const express = require('express');
const isAdmin = require('../../middlewares/isAdmin')
const isLogin = require('../../middlewares/isLogin');
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin');
const { adminRegisterStudent, loginStudent, getStudentProfile, getAllStudentByAdmin, getSingleStudentByAdmin, updateStudent, deleteStudent, adminUpdateStudent, writeExam } = require('../../controller/student/studentController');

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent)
studentRouter.post("/login", loginStudent)
studentRouter.get("/profile",isStudentLogin, isStudent,getStudentProfile)
studentRouter.get("/admin",isLogin, isAdmin,getAllStudentByAdmin)
studentRouter.get("/:studentID/admin",isLogin, isAdmin,getSingleStudentByAdmin)
studentRouter.put("/update",isStudentLogin, isStudent,updateStudent)
studentRouter.put("/:studentID/update/admin",isLogin, isAdmin,adminUpdateStudent)
studentRouter.post("/exam/:examID/write",isStudentLogin, isStudent,writeExam)
studentRouter.delete("/:studentID/admin",isLogin, isAdmin,deleteStudent)


module.exports = studentRouter;