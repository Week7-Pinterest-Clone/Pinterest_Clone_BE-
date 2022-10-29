const LikeService = require("../services/likes.service");
const InvalidParamsError = require("../exceptions/index.exception");

class LikeController {
  constructor() {
    likeService = new LikeService();
  }
  liketoggle = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;
      if (!userId || !commentId) {
        throw new InvalidParamsError("");
      }
      const findLike = await this.likeService.findLike({ userId, commentId });
      if (!findLike) {
        const createLike = await this.likeService.createLike({
          userId,
          commentId,
        });
        res.status(201).json({
          msg: "좋아요 등록완료",
        });
      }
      if (findLike) {
        const destroyLike = await this.likeService.destroyLike({
          userId,
          commentId,
        });
        res.status(200).json({
          msg: "좋아요 등록취소",
        });
      }
      const likeCount = await this.likeService.likeCount({ commentId });
      res.status(200).json({ data: likeCount, msg: "좋아요 갯수" });
    } catch (error) {
      next(error);
    }
  };
}
