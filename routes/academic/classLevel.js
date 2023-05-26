const express = require("express");
const { createClassLevel, getClassLevel, getSingleClassLevel, updateClassLevel, deleteClassLevel } = require("../../controller/academic/classLevelController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");


const ClassLevelRouter = express.Router();

ClassLevelRouter.post("/",isLogin, isAdmin, createClassLevel);
ClassLevelRouter.get("/",isLogin, isAdmin, getClassLevel);
ClassLevelRouter.get("/:id",isLogin, isAdmin, getSingleClassLevel);
ClassLevelRouter.put("/:id",isLogin, isAdmin, updateClassLevel);
ClassLevelRouter.delete("/:id",isLogin, isAdmin, deleteClassLevel);

module.exports = ClassLevelRouter;