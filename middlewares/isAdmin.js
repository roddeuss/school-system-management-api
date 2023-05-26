const Admin = require("../model/staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async  (req,res,next) => {
    //
    const userId = req?.userAuth?._id
    const adminFound = await Admin.findById(userId);
    
    // check this admin
    if(adminFound?.role === 'admin') {
        next()
    } else {
        next(new Error('Access Denied, Admin only'))
    }
};

module.exports = isAdmin;