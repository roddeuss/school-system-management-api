const express = require("express");
const { createAcademicYears, getAcademicYears, getSingleAcademicYear, updateAcademicYear, deleteAcademicYear } = require("../../controller/academic/academicYearController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const AcademicYearRouter = express.Router();

AcademicYearRouter.post("/",isLogin, isAdmin, createAcademicYears);
AcademicYearRouter.get("/",isLogin, isAdmin, getAcademicYears);
AcademicYearRouter.get("/:id",isLogin, isAdmin, getSingleAcademicYear);
AcademicYearRouter.put("/:id",isLogin, isAdmin, updateAcademicYear);
AcademicYearRouter.delete("/:id",isLogin, isAdmin, deleteAcademicYear);

module.exports = AcademicYearRouter;