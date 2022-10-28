const express = require('express');
const indexRouter = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');

indexRouter.use("/users", usersRouter);
indexRouter.use('/posts', postsRouter);
indexRouter.use('/save', postsRouter);


module.exports = indexRouter;
