const express = require('express');
const {adminRegisterTeacher, loginTeacher, getAllTeachersAdmin, getSingleTeachersAdmin, getTeacherProfile, teacherUpdateProfile, adminUpdateTeacher} = require("../../controller/staff/teacherController")
const isAdmin = require('../../middlewares/isAdmin')
const isLogin = require('../../middlewares/isLogin');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher')
const advanceResults = require('../../middlewares/advanceResults');
const Teacher = require('../../model/staff/Teacher')
const Admin = require('../../model/staff/Admin')
const isAuthenticated = require('../../middlewares/isAuthenticated');
const roleRestriction = require('../../middlewares/roleRestriction');
const teacherRouter = express.Router();

teacherRouter.post('/admin/register', isAuthenticated(Admin), roleRestriction("admin"), adminRegisterTeacher);
teacherRouter.post('/login', loginTeacher);
teacherRouter.get('/admin',isLogin,isAdmin,advanceResults(Teacher, {
    path: 'examsCreated',
    populate: {
        path: 'questions'
    }
}), getAllTeachersAdmin)
teacherRouter.get('/profile',isAuthenticated(Teacher) ,roleRestriction("teacher"), getTeacherProfile)
teacherRouter.get('/:teacherID/admin',isAuthenticated(Admin), roleRestriction("admin"), getSingleTeachersAdmin)
teacherRouter.put('/:teacherID/update',isAuthenticated(Teacher) ,roleRestriction("teacher"), teacherUpdateProfile)
teacherRouter.put('/:teacherID/update/admin',isAuthenticated(Teacher) ,roleRestriction("teacher"), adminUpdateTeacher)


module.exports = teacherRouter;