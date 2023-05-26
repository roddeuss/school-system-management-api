const Admin = require("../model/staff/Admin");
const Teacher = require("../model/staff/Teacher");
const verifyToken = require("../utils/verifyToken");

const isTeacher = async  (req,res,next) => {
    //
    const userId = req?.userAuth?._id
    const teacherFound = await Teacher.findById(userId);
    
    // check this admin
    if(teacherFound?.role === 'teacher') {
        next()
    } else {
        next(new Error('Access Denied, Teacher only'))
    }
};

module.exports = isTeacher;