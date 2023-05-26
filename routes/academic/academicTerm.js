const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const { createAcademicTerm, getAcademicTerm, getSingleAcademicTerm, updateAcademicTerm, deleteAcademicTerm } = require("../../controller/academic/academicTermController");

const AcademicTermRouter = express.Router();

AcademicTermRouter.post("/",isLogin, isAdmin, createAcademicTerm);
AcademicTermRouter.get("/",isLogin, isAdmin, getAcademicTerm);
AcademicTermRouter.get("/:id",isLogin, isAdmin, getSingleAcademicTerm);
AcademicTermRouter.put("/:id",isLogin, isAdmin, updateAcademicTerm);
AcademicTermRouter.delete("/:id",isLogin, isAdmin, deleteAcademicTerm);

module.exports = AcademicTermRouter;