const ValidationError = require("../exceptions/index.exception");
const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();
  //*좋아요 찾기
  findLike = async ({ userId, commentId }) => {
    const like = await this.likeRepository.findLike({ userId, commentId });
    return findLike;
  };
  //*좋아요
  createLike = async ({ userId, commentId }) => {
    const like = await this.likeRepository.findLike({ userId, commentId });
    if (!like) {
      await this.likeRepository.createLike({ userId, commentId });
      await this.likeRepository.upLike({ commentId });
    }
    return like;
  };
  //*좋아요 취소
  destroyLike = async ({ userId, commentId }) => {
    const like = await this.likeRepository.findLike({ userId, commentId });
    if (like) {
      await this.likeRepository.destroyLike({ userId, commentId });
      await this.likeRepository.downLike({ commentId });
    }
    return destroyLike;
  };
  //*좋아요 카운트
  likeCount = async ({ commentId }) => {
    const likeCount = await this.likeRepository.likeCount({ commentId });
    return likeCount;
  };
}
module.exports = LikeService;
