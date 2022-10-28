const CommentRepository = require("../repositories/comments.repository")

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository
    }
    createComment = async({comment,postId,userId}) =>{
        const createComment = await this.commentRepository({comment,postId,userId})
        return createComment
    }
}
module.exports = CommentService