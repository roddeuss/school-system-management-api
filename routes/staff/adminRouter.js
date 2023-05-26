const express = require('express');
const {
    registerAdminController, 
    loginAdminController, 
    allAdminController, 
    getAdminProfileController, 
    updateAdminController, 
    deleteAdminController, 
    suspendTeacherController, 
    unsuspendTeacherController, 
    withdrawTeacherController, 
    unwithdrawTeacherController, 
    publicExamController, 
    unpublicExamController
} = require("../../controller/staff/adminController");
const adminRouter = express.Router();
const isAdmin = require('../../middlewares/isAdmin')
const isLogin = require('../../middlewares/isLogin');

// admin register
adminRouter.post('/register', registerAdminController )
//admin login
adminRouter.post('/login', loginAdminController)
// all admins
adminRouter.get('/', isLogin, allAdminController)
// single admins
adminRouter.get('/profile', isLogin, isAdmin, getAdminProfileController)
// update admins
adminRouter.put('/',isLogin, isAdmin, updateAdminController)
//delete admins
adminRouter.delete('/:id', deleteAdminController)
// suspend teacher
adminRouter.put('/suspend/teacher/:id', suspendTeacherController)
// unsusped teacher
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacherController )
//withdraw teacher
adminRouter.put('/withdraw/teacher/:id', withdrawTeacherController )
//unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', unwithdrawTeacherController )
//publish exam
adminRouter.put('/publish/exam/:id', publicExamController )
//unpublish exam
adminRouter.put('/unpublish/exam/:id', unpublicExamController)

module.exports = adminRouter;


