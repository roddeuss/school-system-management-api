const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/staff/Teacher");
const Admin = require("../../model/staff/Admin");
const {hashPassword, isPassMatched} = require("../../utils/helper");
const generateToken = require("../../utils/generateToken");

// register the teacher
exports.adminRegisterTeacher = AsyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    //find the amin
    const adminFound = await Admin.findById(req.userAuth._id);
    if(!adminFound) {
        throw new Error('Admin not found')
    }

    //check if teacher already exists
    const teacher = await Teacher.findOne({email});
    if(teacher) {
        throw new Error('Teacher already employed')
    }

    //create
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: await hashPassword(password)
    });
    //push teacher to admin
    adminFound.teacher.push(teacherCreated?._id);
    await adminFound.save()
    res.status(201).json({
        status: 'success',
        message: 'Teacher registered successfully',
        data: teacherCreated
    })
})

// login the teacher
exports.loginTeacher = AsyncHandler(async(req, res) => {
    const {email, password } = req.body;
    //find the user
    const teacher = await Teacher.findOne({email});
    if(!teacher) {
        return res.json({message: 'invalod login crendentials'});
    }
    //verify the password
    const isMatched = await isPassMatched(password, teacher?.password); 
    if(!isMatched) {
        return res.json({message: 'password not matched'});
    } else {
        res.status(200).json({
            status: 'success',
            message: 'Teacher login in succesfully',
            data: generateToken(teacher?._id)
        });
    }
});

// get all teachers
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
    // query teacher find
    let TeacherQuery = Teacher.find();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const total = await Teacher.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // filtering a name teacher
    if (req.query.name) {
        TeacherQuery = TeacherQuery.find({
            name: { $regex: req.query.name, $options: "i" },
        });
    }

    // pagination results
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    // add prev
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    // execute query
    const teachers = await TeacherQuery
        .skip(skip)
        .limit(limit)
        .exec(); // add .exec() to execute the query

    res.status(200).json({
        status: "success",
        message: "Teacher fetched successfully",
        total: total,
        pagination: pagination,
        results: teachers.length,
        data: teachers,
    });
});


// get single profile teachers
exports.getSingleTeachersAdmin = AsyncHandler(async (req, res) => {
    const teacherID = req.params.teacherID;
    //find the teacher
    const teachers = await Teacher.findById(teacherID);
    if(!teachers) {
        throw new Error('Teacher not found')
    }
    res.status(200).json({
        status: 'success',
        message: 'Single Teacher fetched succesfully',
        data: teachers
    });
});

// teachers profile
exports.getTeacherProfile = AsyncHandler(async (req, res) => {
    const teachers = await Teacher.findById(req.userAuth._id).select('-password -createdAt -updatedAt');
    if(!teachers) {
        throw new Error('Teacher not found')
    }
    res.status(200).json({
        status: 'success',
        message: 'Teacher  fetched succesfully',
        data: teachers
    });
});

//update teachers
exports.teacherUpdateProfile = AsyncHandler( async (req, res) => {
    const {email, name,  password} = req.body;
    //check if email has taken
    const emailExist = await Teacher.findOne({email})
    if(emailExist) {
        throw new Error('This email has taken/exist')
    } 
    // hashing the password
    //check if user updating password
    if(password) {
        //update
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
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
            message: 'Teacher updated successfully',
            data: teacher

        });
    } else {
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
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
            message: 'Teacher updated successfully',
            data: teacher
        });
    }
});

// admin updating teacher profile
exports.adminUpdateTeacher = AsyncHandler( async (req, res) => {
    const {program, classLevel, academicYear, subject} = req.body;
    //check Teacher
    const teacherFound = await Teacher.findById(req.params.teacherID)
    if(!teacherFound) {
        throw new Error('Teacher not found')
    } 
    //check if teacher is withdrawn
    if(teacherFound.isWithdrawn) {
        throw new Error('Action denied, teachers is withdrawn')
    }

    //assign a program
    if(program) {
        teacherFound.program = program;
        await teacherFound.save();
        res.status(200).json({
            status: 'success',
            message: 'Teacher updated succesfully',
            data: teacherFound

        });
    }

    //assign a class level
    if(classLevel) {
        teacherFound.classLevel = classLevel;
        await teacherFound.save();
        res.status(200).json({
            status: 'success',
            message: 'Teacher updated succesfully',
            data: teacherFound

        });
    }

    //assign a academic year
    if(academicYear) {
        teacherFound.academicYear = academicYear;
        await teacherFound.save();
        res.status(200).json({
            status: 'success',
            message: 'Teacher updated succesfully',
            data: teacherFound

        });
    }

    //assign a academic term
    if(subject) {
        teacherFound.subject = subject;
        await teacherFound.save();
        res.status(200).json({
            status: 'success',
            message: 'Teacher updated succesfully',
            data: teacherFound
        });
    }

});