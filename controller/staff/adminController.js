const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")
const Admin = require("../../model/staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const {hashPassword, isPassMatched} = require("../../utils/helper")


//register admin
exports.registerAdminController = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
        //check if email exists
        const adminFound = await Admin.findOne({ email });
        if(adminFound) {
            throw new Error("Admin Exists")
        }

        //register
        const user = await Admin.create({
            name,
            email,
            password: await hashPassword(password)
        })
        res.status(201).json({
            status: 'success',
            mesasge: 'Admin registered successfully',
            data: user
        })
})

exports.loginAdminController = AsyncHandler(async (req, res) => {   
    const { email, password } = req.body;
        // find user
        const user = await Admin.findOne({email});
        if(!user) {
            return res.json({
                mesesage: 'User Not Found'
            })
        }
        // verify hashing password
        const isMatched = await isPassMatched(password, user.password);
        //if password matched
        if(!isMatched) {
            return res.json({
                mesesage: 'password not matched'
            })
        } else {
            return res.json({
                data: generateToken(user._id), 
                message: "Admin logged in successfully"
            })
        }
    });

exports.allAdminController = AsyncHandler(async (req, res) => {
    const admins = await Admin.find();
    res.status(200).json({
        status: 'success',
        message: 'Admin fetched successfully',
        data: admins
    })
})

exports.getAdminProfileController = AsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select("-password  -createdAt -updatedAt")
    .populate("academicYears")
    if(!admin) {
        throw new Error('Admin not found')
    } else {
        res.status(200).json({
            status: 'success',
            message: 'Admin Profile fetched successfully',
            data: admin
        })
    }
});

exports.updateAdminController = AsyncHandler( async (req, res) => {
    const {email, name,  password} = req.body;
    //check if email has taken
    const emailExist = await Admin.findOne({email})
    if(emailExist) {
        throw new Error('This email has taken/exist')
    } 
    // hashing the password
    //check if user updating password
    if(password) {
        //update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            password : await hashPassword(password),
            name
        },
        {
            new: true,
            runValidators: true
        }
        );
        res.status(200).json({
            status: 'success',
            message: 'Admin updated successfully',
            data: admin

        });
    } else {
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            name
        },
        {
            new: true,
            runValidators: true
        }
        );
        res.status(200).json({
            status: 'success',
            message: 'Admin updated successfully',
            data: admin

        });
    }
});

exports.deleteAdminController =  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: ' delete admin',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.suspendTeacherController =  (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin suspend teacher',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.unsuspendTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin unsuspend teacher',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.withdrawTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin withdraw teacher',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
} 

exports.unwithdrawTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin unwithdraw teacher',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.publicExamController = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin publish exam',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}


exports.unpublicExamController = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            mesasge: 'admin unpublish exam',
        })
    } catch (error) {
        res.json({
            status: 'failed',
            error: error.message
        })
    }
}

