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
}

module.exports = UserService;
