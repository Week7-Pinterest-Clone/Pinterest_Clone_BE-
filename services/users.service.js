const {
  DuplicateDBDataError,
  ValidationError,
} = require("../exceptions/index.exception");
const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  createUser = async (users) => {
    const { email, nickname, password } = users;

    //회원가입으로 받은 이메일이 유저DB에 이미 존재하면 에러방생
    const isExistUser = await this.userRepository.findByEmail(email);
    if (isExistUser) {
      throw new DuplicateDBDataError(
        "동일한 email을 가진 User가 이미 존재합니다."
      );
    }

    //유저생성 레퍼지토리 호출
    await this.userRepository.createUser({
      email,
      nickname,
      password,
    });
    return;
  };

  verifiUser = async (email, password) => {
    //로그인 요청이메일이 db에 존재하는지 확인
    const user = await this.userRepository.findByEmail(email);

    //유저정보가 없다면 에러 있으면 userId변수에 할당
    let userId;
    if (!user) {
      throw new ValidationError("가입되지 않은 이메일 입니다.");
    } else {
      userId = user.userId;
    }

    //비밀번호 일치확인
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) throw new ValidationError("비번이 틀렸어요.");

    /**accessToken 발급 */
    const accessToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
      expiresIn: "60s",
    });

    /**refreshToken 발급 */
    const refreshToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  };
}

module.exports = UserService;
