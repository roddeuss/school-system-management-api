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
const Admin = require('../../model/staff/Admin');
const advanceResults = require('../../middlewares/advanceResults');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const roleRestriction = require('../../middlewares/roleRestriction');
// admin register
adminRouter.post('/register', registerAdminController )
//admin login
adminRouter.post('/login', loginAdminController)
// all admins
adminRouter.get('/', isLogin,advanceResults(Admin),  allAdminController)
// single admins
adminRouter.get('/profile', isAuthenticated(Admin), roleRestriction("admin"), getAdminProfileController)
// update admins
adminRouter.put('/',isAuthenticated(Admin), roleRestriction("admin"), updateAdminController)
//delete admins
adminRouter.delete('/:id',isAuthenticated(Admin), roleRestriction("admin"), deleteAdminController)
// suspend teacher
adminRouter.put('/suspend/teacher/:id',isAuthenticated(Admin), roleRestriction("admin"), suspendTeacherController)
// unsusped teacher
adminRouter.put('/unsuspend/teacher/:id',isAuthenticated(Admin), roleRestriction("admin"), unsuspendTeacherController )
//withdraw teacher
adminRouter.put('/withdraw/teacher/:id',isAuthenticated(Admin), roleRestriction("admin"), withdrawTeacherController )
//unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id',isAuthenticated(Admin), roleRestriction("admin"), unwithdrawTeacherController )
//publish exam
adminRouter.put('/publish/exam/:id',isAuthenticated(Admin), roleRestriction("admin"), publicExamController )
//unpublish exam
adminRouter.put('/unpublish/exam/:id',isAuthenticated(Admin), roleRestriction("admin"), unpublicExamController)

module.exports = adminRouter;


