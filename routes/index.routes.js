const express = require('express');
const indexRouter = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require('./posts.routes');

indexRouter.use("/", usersRouter);
indexRouter.use('/posts', postsRouter);

module.exports = indexRouter;
