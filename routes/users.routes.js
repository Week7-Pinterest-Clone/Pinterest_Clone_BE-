const { Router } = require("express");
const usersRouter = Router();
const upload = require('../modules/users.multer');

const authMiddleware = require("../middlewares/authMiddleware");
const loginAuthMiddleware = require("../middlewares/loginAuthMiddleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

//회원가입
usersRouter.post("/signup", loginAuthMiddleware, usersController.signup);

//로그인
usersRouter.post("/login", loginAuthMiddleware, usersController.login);

//유저 프로필 조회
usersRouter.get("/:userId", authMiddleware, usersController.profile);

//프로필 이미지
usersRouter.put('/:userId/image', authMiddleware, upload.array('image',1), imagesController.uploadImage);


module.exports = usersRouter;
