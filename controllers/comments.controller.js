const CommentService = require("../services/comments.service");
const errorHandler = require("../middlewares/error-handler.middleware");
class CommentsController {
  constructor() {
    commentService = new CommentService();
  }
  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals.user;

    if (!comment) {
      throw new errorHandler("댓글 내용을 입력해주세요");
    }
    await this.commentService.createComment({ comment, postId, userId });

    res.status(201).json({ msg: "댓글을 작성하였습니다." });
  };
  findAllComment = async (req, res, next) => {
    const { postId } = req.params;
    const findAllComment = await this.commentService.findAllComment;
    ({ postId });
    res.status(200).json({ data: findAllComment, msg: "댓글 목록 조회 완료" });
  };
}
module.exports = CommentsController;
