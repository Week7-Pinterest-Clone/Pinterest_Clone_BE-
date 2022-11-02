const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");
require("dotenv").config();

// 카카오로그인
const kakaoCallback = (req, res, next) => {
  try {
    console.log("test");
    passport.authenticate(
      "kakao",
      { failureRedirect: "/main" }, // 실패하면 '/main'으로 돌아감.
      async (err, user, info) => {
        if (err) return next(err);

        const { userId, nickname } = user;

        const accessToken = jwt.sign(
          { userId: userId },
          process.env.SECRET_KEY,
          { expiresIn: "3h" }
        );
        const refreshToken = jwt.sign(
          { userId: userId },
          process.env.SECRET_KEY,
          { expiresIn: "5h" }
        );

        // await User.update({ refreshToken }, { where: { userId: userId } });

        res.cookie("refreshToken", refreshToken);
        res.cookie("accessToken", accessToken);

        result = { userId, accessToken, refreshToken, nickname };
        res.status(201).json({
          user: result,
          msg: "카카오 로그인에 성공하였습니다.",
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.get(
  "/kakao",
  passport.authenticate("kakao", {
    scope: ["profile_nickname", "account_email", "profile_image", "gender"],
  })
);

// 카카오에서 설정한 redicrect url을 통해 요청 재전달
router.get("/kakao/callback", kakaoCallback);

module.exports = router;
