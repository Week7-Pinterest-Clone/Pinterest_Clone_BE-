const { Like } = require("../models/");
const { Comment } = require("../models/");

class LikeRepository extends Like {
  constructor() {
    super();
  }
  //*좋아요 데이터 찾기
  findLike = async ({ userId, commentId }) => {
    const findLike = await Like.findOne({ where: { userId, commentId } });
    return findLike;
  };
  //*좋아요 만들기
  createLike = async ({ userId, commentId, isLike }) => {
    const createLike = await Like.create({ userId, commentId, isLike });
    return createLike;
  };
  //*좋아요 on
  upLike = async ({ commentId }) => {
    const upLike = await Comment.increment(
      { likeCount: 1 },
      { where: { commentId } }
    );
    return upLike;
  };
  //*좋아요off
  downLike = async ({ commentId }) => {
    const downLike = await Comment.increment(
      { likeCount: -1 },
      { where: { commentId } }
    );
    return downLike;
  };
  likeCount = async({});
}
module.exports = LikeRepository;
