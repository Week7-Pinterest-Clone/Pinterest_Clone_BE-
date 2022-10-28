const express = require("express");
const indexRouter = express.Router();
const usersRouter = require("./users.routes");
//예시 indexRouter.use('/경로',라우터명)

indexRouter.use("/", usersRouter);

module.exports = indexRouter;
