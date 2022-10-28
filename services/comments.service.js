const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  //*댓글작성
  createComment = async ({ comment, postId, userId }) => {
    const createComment = await this.commentRepository.createComment({
      comment,
      postId,
      userId,
    });
    return createComment;
  };
  //*댓글조회
  findAllComment = async ({ postId }) => {
    const findAllcomment = this.commentRepository.findAllComment({ postId });
    return findAllcomment;
  };
  //*댓글 수정
  updateComment = async ({ userId, comment, commentId }) => {
    const findComment = await this.commentRepository.findOneComment({
      commentId,
    });
    if (findComment.userId === userId)
      await this.commentRepository.updateComment({
        userId,
        comment,
        commentId,
      });
  };
  //*댓글 삭제
  deleteComment = async ({ commentId, userId }) => {
    const findOneComment = await this.commentRepository.findOneComment({
      commentId,
    });
    if (findOneComment.userId === userId) {
      await this.commentRepository.deleteComment;
      ({ commentId });
    }
  };
}
module.exports = CommentService;
