<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');

router.use("/users", usersRouter);
router.use('/posts', postsRouter);
router.use('/save', postsRouter);
=======
const express = require("express");
const router = express.Router();
const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/save", postsRouter);
>>>>>>> 7b09f45a0467537c1c4daf3693681cce898412ba

module.exports = router;
