const { Router } = require("express");
const usersRouter = Router();

const authMiddleware = require("../middlewares/authMiddleware");
const loginAuthMiddleware = require("../middlewares/loginAuthMiddleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

usersRouter.get("/:userId", authMiddleware, usersController.profile);
usersRouter.post("/signup", loginAuthMiddleware, usersController.signup);
usersRouter.post("/login", loginAuthMiddleware, usersController.login);

module.exports = usersRouter;
