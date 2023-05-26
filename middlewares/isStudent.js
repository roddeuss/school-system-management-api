const Student = require("../model/academic/Student");
const verifyToken = require("../utils/verifyToken");

const isStudent = async  (req,res,next) => {
    //
    const userId = req?.userAuth?._id
    const studentFound = await Student.findById(userId);
    
    // check this admin
    if(studentFound?.role === 'student') {
        next()
    } else {
        next(new Error('Access Denied, Student only'))
    }
};

module.exports = isStudent;