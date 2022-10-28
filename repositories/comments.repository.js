const {Comment}  = require('../models/');

class CommentRepository extends Comment {
    constructor() {
        super()
        }
        //*댓글작성
    createComment = async ({comment, postId, userId}) => {
        
        const createComment = await Comment.create({
            comment,
            userId,
            postId
        })
        return createComment
    }
    //*댓글조회
    findAllComment = async ({postId}) =>{
        const findAllComment = await Comment.findAll({
            where: {postId},
            include: [{
                model: User,
                attributes:[nickname,userId]
        },
        {model:Like,
        attributes:[isLike]}]
        })
        return findAllComment
    }


}
module.exports = CommentRepository