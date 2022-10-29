const { Like } = require("../models/");
const { Comment } = require("../models/");

class LikeRepository extends Like {
  constructor() {
    super();
  }
  //*좋아요 만들기
  createLike = async ({ userId, commentId, isLike }) => {
    const createLike = await Like.create({ userId, commentId, isLike });
    return createLike;
  };
  //*좋아요 on/off
  upLike = async ({ userId, commentId, isLike }) => {
    const upLike = await Comment.increment(
      { likeCount: 1 },
      { where: { userId, commentId } }
    );
    return upLike;
  };
}