const express = require('express');
const morgan = require('morgan');
const academicYearRouter = require("../routes/academic/academicYear");
const {globalErrorHandler, notFoundError} = require('../middlewares/globalErrorHandler');
const AcademicTermRouter = require('../routes/academic/academicTerm');
const classLevelRouter = require('../routes/academic/classLevel');
const adminRouter = require('../routes/staff/adminRouter');
const ProgramRouter = require('../routes/academic/program');
const SubjectRouter = require('../routes/academic/subject');
const YearGroupRouter = require('../routes/academic/yearGroup');
const teacherRouter = require('../routes/staff/teacherRouter');
const examRouter = require('../routes/academic/exam');
const studentRouter = require('../routes/student/studentRouter');

const app = express()


//middleware
app.use(morgan("dev"));
app.use(express.json()) //pass incoming json data

//Routes
app.use("/api/v1/admins/", adminRouter)
app.use("/api/v1/academic-years/", academicYearRouter)
app.use("/api/v1/academic-term/", AcademicTermRouter)
app.use("/api/v1/class-levels/", classLevelRouter)
app.use("/api/v1/exams/", examRouter)
app.use("/api/v1/programs/", ProgramRouter)
app.use("/api/v1/subjects/", SubjectRouter)
app.use("/api/v1/year-groups/", YearGroupRouter)
app.use("/api/v1/teachers/", teacherRouter)
app.use("/api/v1/students/", studentRouter)

//Error Middleware
app.use(notFoundError)
app.use(globalErrorHandler)

module.exports = app
