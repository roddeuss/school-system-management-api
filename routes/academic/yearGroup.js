const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const { createYearGroup, getYearGroup, getSingleYearGroup, updateYearGroup, deleteYearGroup } = require("../../controller/academic/yearGroupController");


const YearGroupRouter = express.Router();

YearGroupRouter.post("/",isLogin, isAdmin, createYearGroup);
YearGroupRouter.get("/",isLogin, isAdmin, getYearGroup);
YearGroupRouter.get("/:id",isLogin, isAdmin, getSingleYearGroup);
YearGroupRouter.put("/:id",isLogin, isAdmin, updateYearGroup);
YearGroupRouter.delete("/:id",isLogin, isAdmin, deleteYearGroup);

module.exports = YearGroupRouter;