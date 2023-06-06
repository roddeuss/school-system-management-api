const express = require('express');
const isAdmin = require('../../middlewares/isAdmin')
const isLogin = require('../../middlewares/isLogin');
const isStudent = require('../../middlewares/isStudent')
const isStudentLogin = require('../../middlewares/isStudentLogin');
const { adminRegisterStudent, loginStudent, getStudentProfile, getAllStudentByAdmin, getSingleStudentByAdmin, updateStudent, deleteStudent, adminUpdateStudent, writeExam } = require('../../controller/student/studentController');
const Admin = require('../../model/staff/Admin');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const roleRestriction = require('../../middlewares/roleRestriction');
const Student = require('../../model/academic/Student');

const studentRouter = express.Router();

studentRouter.post("/admin/register", isAuthenticated(Admin) ,roleRestriction("admin"), adminRegisterStudent)
studentRouter.post("/login", loginStudent)
studentRouter.get("/profile",isAuthenticated(Student) ,roleRestriction("student"),getStudentProfile)
studentRouter.get("/admin",isAuthenticated(Admin) ,roleRestriction("admin"),getAllStudentByAdmin)
studentRouter.get("/:studentID/admin",isAuthenticated(Student) ,roleRestriction("student"),getSingleStudentByAdmin)
studentRouter.put("/update",isAuthenticated(Student) ,roleRestriction("student"),updateStudent)
studentRouter.put("/:studentID/update/admin",isAuthenticated(Admin) ,roleRestriction("admin"),adminUpdateStudent)
studentRouter.post("/exam/:examID/write",isAuthenticated(Student) ,roleRestriction("student"),writeExam)
studentRouter.delete("/:studentID/admin",isAuthenticated(Admin) ,roleRestriction("admin"),deleteStudent)


module.exports = studentRouter;