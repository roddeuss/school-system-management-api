const Student = require("../../model/academic/Student");
const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassMatched } = require("../../utils/helper");
const generateToken = require("../../utils/generateToken");

// create admin register student
exports.adminRegisterStudent = AsyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    const student = await Student.findOne({email});
    if(student) {
        throw new Error('Student Already Exists');
    }
    //create
    const studentRegistered = await Student.create({
        name,
        email,
        password: await hashPassword(password)
    });
    //send teacher data
    res.status(201).json({
        status : 'success',
        message: 'Student registered successfully',
        data: studentRegistered
    });
});

// login student 
exports.loginStudent = AsyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //find the user student
    const student = await Student.findOne({email});
    if(!student) {
        return res.json({message: 'invalid login crendentials'});
    }
    //verify the password
    const isMatched = await isPassMatched(password, student?.password)
    if(!isMatched) {
        return res.json({message: 'password not matched'});
    } else {
        res.status(201).json({
            status : 'success',
            message: 'Student login successfully',
            data: generateToken(student?._id),
        });
    }
});

//get profile student
exports.getStudentProfile = AsyncHandler(async(req, res) => {
    const student = await Student.findById(req.userAuth._id).select('-password -createdAt -updatedAt');
    //check student 
    if(!student) {
        throw new Error('Student not found')
    }
    res.status(200).json({
        status: 'success',
        message: 'student profile fetched successfully',
        data: student
    }); 
});

// get all student by admin
exports.getAllStudentByAdmin = AsyncHandler(async(req, res) => {
    const student = await Student.find();
    res.status(200).json({
        status: 'success',
        message: 'student fetched successfully',
        data: student
    });
});

//get single student by admin
exports.getSingleStudentByAdmin = AsyncHandler(async(req, res) => {
    const studentID = req.params.studentID;
    //find the student
    const student = await Student.findById(studentID);
    if(!student) {
        throw new Error('Student not found')
    }
    res.status(200).json({
        status: 'success',
        message: 'student fetched successfully',
        data: student
    });
});

//update student 
exports.updateStudent = AsyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //if email is taken
    const emailExist = await Student.findOne({email});
    if(emailExist) {
        throw new Error('this email is taken/exists')
    }
    //hash the password
    //check updating the password
    if(password) {
        //update
        const student = await Student.findByIdAndUpdate(
            req.userAuth._id,
            {
                email,
                password: await hashPassword(password)
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            message: 'student update successfully',
            data: student
        });
    } else {
        //update
        const student = await Student.findByIdAndUpdate(
            req.userAuth._id,
            {
                email
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            message: 'student update successfully',
            data: student
        });
    }
})

//delete student
exports.deleteStudent = AsyncHandler (async(req, res) => {
    await Student.findByIdAndDelete(req.params.studentID)
    res.status(201).json({
        status: "success",
        message: "Student Deleted successfully",
    });
});

//admin updating students
//examples assign class
exports.adminUpdateStudent = AsyncHandler(async(req, res) => {
    const {classLevels, academicYear, program, name, email, prefectName} = req.body;

    const studentFound = await Student.findById(req.params.studentID)
    if(!studentFound) {
        throw new Error('Student not found')
    }

    //update
    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {
        $set: {
            name,
            email,
            academicYear,
            program,
            prefectName,
        },
        $addToSet: {
            classLevels: classLevels
        },
    },
    {
        new: true,
    },
    );
    //send response
    res.status(200).json({
        status: 'success',
        message: 'Student updated successfully',
        data: studentUpdated
    })
})