const { Comment } = require("../models/");

class CommentRepository extends Comment {
  constructor() {
    super();
  }
  //*댓글작성
  createComment = async ({ comment, postId, userId }) => {
    const createComment = await Comment.create({
      comment,
      userId,
      postId,
    });
    return createComment;
  };
  //*댓글 찾기
  findOneComment = async (commentId) => {
    const comments = await Comment.findByPk(commentId);
    return comments;
  };
  //*댓글조회
  findAllComment = async ({ postId }) => {
    const findAllComment = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: [nickname, userId],
        },
        { model: Like, attributes: [isLike] },
      ],
    });
    return findAllComment;
  };
  //*댓글수정
  updateComment = async ({ userId, comment, commentId }) => {
    const updateComment = await Comment.update(
      { comment: comment },
      { where: { commentId: commentId, userId: userId } }
    );
    return updateComment;
  };
}
module.exports = CommentRepository;
