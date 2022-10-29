const express = require("express");
const router = express.Router();
const usersRouter = require("./users.routes");
// const postsRouter = require("./posts.routes");

router.use("/users", usersRouter);
// router.use("/posts", postsRouter);
// router.use("/save", postsRouter);

module.exports = router;
