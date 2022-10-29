const { Post, User} = require('../models');

class PostRepository {
  //게시글전체조회
  findAllPost = async () => {
    const allPost = await Post.findAll({
      include: { model: User },
    });

    return allPost;
  };
  //게시글상세조회
  findOnePost = async (postId) => {
    const postsOne = await Post.findOne({where:{postId},
        include:[{model:User}]})

    return postsOne;
  };
  //게시글업로드
  createPosts = async (userId, title, content) => {
    await Post.create({
      userId,
      title,
      content,
    });

    return;
  };

  //게시글 삭제
  deletePosts = async (postId, userId) => {
    const deletePost = Post.destroy({
      where: { postId, userId },
    });

    return deletePost;
  };

  //게시글 저장 (찜하기)
  savePosts = async (userId) => {
    const savePosts = Save.update({ img }, { where: { userId }});

    return savePosts;
  };

  savePosts = async (req, res, next) => {
    const {postId} =req.params
    const {userId} = res.locals.user
    const savePosts = await this.postService.savePosts({postId, userId})

    res.status(201).json({data: savePosts})
  };
}

module.exports = PostRepository;
