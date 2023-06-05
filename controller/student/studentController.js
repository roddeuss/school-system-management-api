const Student = require("../../model/academic/Student");
const Exam = require("../../model/academic/Exam");
const ExamResults = require("../../model/academic/ExamResults");
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
    const student = await Student.findById(req.userAuth._id).select('-password -createdAt -updatedAt')
    .populate('examResults')
    //check student 
    if(!student) {
        throw new Error('Student not found')
    }
    //get student profile
    const studentProfile = {
        name: student?.name,
        email: student?.email,
        currentClassLevel: student?.currentClassLevel,
        program: student?.program,
        dateAdmitted: student?.dateAdmitted,
        isSuspended: student?.isSuspended,
        isWithdrawn: student?.isWithdrawn,
        studentId: student?.studentId,
        prefectName: student?.prefectName
    };

    //get student exam results
    const examResults = student?.examResults;
    //current exam
    const currentExamResult = examResults[examResults.length - 1];
    //check if exam is published
    const isPublished = currentExamResult?.isPublished;

    //send response
    res.status(200).json({
        status: 'success',
        message: 'student profile fetched successfully',
        data: {
            studentProfile,
            currentExamResult: isPublished ? currentExamResult : [],
        }
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
    const {classLevels, academicYear, program, name, email, prefectName, isSuspended, isWithdrawn} = req.body;

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
            isSuspended,
            isWithdrawn
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


//student taking exams 
exports.writeExam = AsyncHandler(async(req, res) => {
    //get student
        const studentFound = await Student.findById(req.userAuth?._id);
        if(!studentFound) {
            throw new Error("student not found")
        }
    //get exam
        const examFound = await Exam.findById(req.params.examID).populate("questions").populate("academicTerm");
        console.log({examFound})
        if(!examFound) {
            throw new Error("exam not found")
        }
    //get questions 
    const questions = examFound?.questions
    //get student questions
    const studentAnswers = req.body.answers;

    //check if student answered all questions
    if(studentAnswers.length !== questions.length) {
        throw new Error('You have not answered all the question')
    }

    // check if student has already taken  the exams
    // const studentFoundinResults = await ExamResult.findOne({student: studentFound?._id});
    // if(studentFoundinResults) {
    //     throw new Error('You have already written this exam')
    // } 

    // check if student is suspende/withdrawn
    if(studentFound.isWithdrawn || studentFound.isSuspended) {
        throw new Error('You are suspended/wihtdrawn, you cant take this exam ');
    }

        // build report object
        let correctAnswer = 0;
        let wrongAnswer = 0;
        let status = '' //failed or pass
        let remarks = ''
        let grade = 0;
        let score = 0;
        let answeredQuestions = [];

    for(let i=0; i < questions.length; i++) {
        //find the questions
        const question = questions[i];
        if(question.correctAnswer === studentAnswers[i]){
            correctAnswer++
            score++
            question.isCorrect = true;
        } else {
            wrongAnswer++;
        }
    }

    //calcucate reports
    totalQuestion = questions.length;
    grade = (correctAnswer / questions.length) * 100;
    answeredQuestions = questions.map(question=>{
        return {
            question: question.question,
            correctAnswer: question.correctAnswer, 
            isCorrect : question.isCorrect
        }
    });

    // calcucate status
    if(grade >= 60 ){
        status = 'Pass'
    } else {
        status = 'Fail'
    }
    
    // calcucate remakrs
    if(grade >= 80) {
        remarks = 'Excellent'
    } else if (grade >= 70) {
        remarks = 'Very Good'
    } else if (grade >= 60) {
        remarks = 'Good'
    } else {
        remarks = 'Poor'
    }

    //generate exam result 
    const examResults = await ExamResults.create({
        studentID: studentFound?.studentId,
        exam: examFound?._id,
        grade,
        score,
        status,
        remarks,
        classLevel: examFound?.classLevel,
        academicTerm: examFound?.academicTerm,
        academicYear: examFound?.academicYear,
        answeredQuestions: answeredQuestions,

    })
    studentFound.examResults.push(examResults?._id)
    // //save
    await studentFound.save();

    //promition class
    //promote student to level 200
    if(examFound.academicTerm.name === "3nd Term" && status === "Pass" && 
    studentFound?.currentClassLevel === 'Level 100'
    ) {
        studentFound.classLevels.push('Level 200');
        studentFound.currentClassLevel = 'Level 200';
        await studentFound.save();
    }

    //promote student to level 300
    if(examFound.academicTerm.name === "3nd Term" && status === "Pass" && 
    studentFound?.currentClassLevel === 'Level 200'
    ) {
        studentFound.classLevels.push('Level 300');
        studentFound.currentClassLevel = 'Level 300';
        await studentFound.save();
    }

    //promote student to level 400
    if(examFound.academicTerm.name === "3nd Term" && status === "Pass" && 
    studentFound?.currentClassLevel === 'Level 300'
    ) {
        studentFound.classLevels.push('Level 400');
        studentFound.currentClassLevel = 'Level 400';
        await studentFound.save();
    }

    if (
        examFound.academicTerm.name === "3nd Term" && 
        status === "Pass" && 
        studentFound?.currentClassLevel === "Level 400"
    ) {
        studentFound.isGraduated = true;
        studentFound.yearGraduated = new Date;
        await studentFound.save();
    }

    res.status(200).json({
        status: 'success',
        data : 'You have submitted your exam, check later for the result'
    })
});