const express = require('express');
const indexRouter = express.Router();

const postsRouter = require('./posts.routes');

indexRouter.use('/posts', postsRouter);

module.exports = indexRouter;
