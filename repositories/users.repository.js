const { Users } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  /**유저생성 */
  createUser = async ({ email, nickname, password }) => {
    const createUserData = await Users.create({
      email,
      nickname,
      password,
    });

    return createUserData;
  };

  /**유저 정보 찾아오기
   * @param {String} email 유저이메일
   * @param {String} password 유저비번
   * @returns 찾은 유저정보
   */
  findUser = async (email, password) => {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ email }, { password }],
      },
    });

    return user;
  };

  /**유저 이메일로 찾기
   * @param {*} email 찾을 유저이메일
   * @returns 찾은 유저정보
   */
  findByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
  };

  findById = async (userId) => {
    await Users.findByPk(userId);
  };

  updateToken = async (refreshToken, userId) => {
    await Users.update({ refreshToken }, { where: { userId: userId } });
  };
}

module.exports = UserRepository;
