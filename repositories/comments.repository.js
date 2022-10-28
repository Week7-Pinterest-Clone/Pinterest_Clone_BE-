const {Comment}  = require('../models/');

class CommentRepository extends Comment {
    constructor() {
        super()
        }
    createComment = async ({comment, postId, userId}) => {
        
        const createComment = await Comment.create({
            comment,
            userId,
            postId
        })
        return createComment
    }

}
module.exports = CommentRepository