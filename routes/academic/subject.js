const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const { createSubject, getSubject, getSingleSubject, updateSubject, deleteSubject } = require("../../controller/academic/subjectController");


const SubjectRouter = express.Router();

SubjectRouter.post("/:programID",isLogin, isAdmin, createSubject);
SubjectRouter.get("/",isLogin, isAdmin, getSubject);
SubjectRouter.get("/:id",isLogin, isAdmin, getSingleSubject);
SubjectRouter.put("/:id",isLogin, isAdmin, updateSubject);
SubjectRouter.delete("/:id",isLogin, isAdmin, deleteSubject);

module.exports = SubjectRouter;