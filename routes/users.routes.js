const { Router } = require("express");
const usersRouter = Router();
const upload = require("../modules/users.multer");

const authMiddleware = require("../middlewares/authMiddleware");
const loginAuthMiddleware = require("../middlewares/loginAuthMiddleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();
const ImagesController = require("../controllers/images.controller");
const imagesController = new ImagesController();

//회원가입
usersRouter.post("/signup", loginAuthMiddleware, usersController.signup);

//로그인
usersRouter.post("/login", loginAuthMiddleware, usersController.login);

//유저 프로필 조회
usersRouter.get("/:userId", authMiddleware, usersController.profile);

//프로필 업데이트(이미지,닉네임,소개 수정)
usersRouter.put(
  "/profile/:userId",
  authMiddleware,
  upload.array("image", 1),
  imagesController.profileUpdate
);

//내 정보 수정 페이지
usersRouter.get(
  "/profile/:userId",
  authMiddleware,
  usersController.profileUpdatePage
);

module.exports = usersRouter;
