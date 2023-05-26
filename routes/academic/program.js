const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const { createProgram, getProgram, getSingleProgram, updateProgram, deleteProgram } = require("../../controller/academic/programController");


const ProgramRouter = express.Router();

ProgramRouter.post("/",isLogin, isAdmin, createProgram);
ProgramRouter.get("/",isLogin, isAdmin, getProgram);
ProgramRouter.get("/:id",isLogin, isAdmin, getSingleProgram);
ProgramRouter.put("/:id",isLogin, isAdmin, updateProgram);
ProgramRouter.delete("/:id",isLogin, isAdmin, deleteProgram);

module.exports = ProgramRouter;