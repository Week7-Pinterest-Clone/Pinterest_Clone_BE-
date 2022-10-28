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
}
module.exports = CommentService;
