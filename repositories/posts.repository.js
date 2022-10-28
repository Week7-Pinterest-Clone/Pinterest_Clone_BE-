const { Post } = require('../models');

class PostRepository {
  //게시글전체조회
  findAllPost = async () => {
    const allPost = await Post.findAll();

    return allPost;
  };
  //게시글상세조회
  findOnePost = async (postId) => {
    const postsOne = await Post.findByPk(postId);

    return postsOne;
  };
  //게시글업로드
  createPost = async (userId, nickname, title, content, like) => {
    const createPostData = await Post.create({
      userId,
      nickname,
      title,
      content,
      like,
    });

    return createPostData;
  };

  //게시글 삭제
  deletePost = async (postId, userId) => {
    const deletePost = Post.destroy({
      where: { postId, userId },
    });

    return deletePost;
  };

  //게시글 저장 (찜하기)
  savePosts = async (userId) => {
    const savePosts = Post.update({ img }, { where: { userId } });
    
    return savePosts;
  };
}

module.exports = PostRepository;
