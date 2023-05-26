const Admin = require("../model/staff/Admin");
const Teacher = require("../model/staff/Teacher");
const verifyToken = require("../utils/verifyToken");

const isTeacherLogin = async  (req,res,next) => {
    // get token from header
    const headerObj = req.headers;
    const token = headerObj.authorization?.split(" ")[1];
    // verify token
    const verifiedToken = verifyToken(token);
    if(verifiedToken) {
        // find the admin
        const user = await Teacher.findById(verifiedToken.id).select('name email role')
        // save the user into req.object
        req.userAuth = user;
        next()
    }else {
        const err = new Error('Token Expired or Invalid');
        next(err)
    }
    
};

module.exports = isTeacherLogin;