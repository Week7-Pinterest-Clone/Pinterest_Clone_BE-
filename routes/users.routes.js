const { Router } = require("express");
const usersRouter = Router();

const authMiddleware = require("../middlewares/authMiddleware");
const authLoginUserMiddleware = require("../middlewares/authLoginUserMiddleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

usersRouter.post("/signup", authLoginUserMiddleware, usersController.signup);
usersRouter.post("/login", authLoginUserMiddleware, usersController.login);
usersRouter.get("/mypage", authMiddleware, usersController.mypage);

module.exports = usersRouter;
