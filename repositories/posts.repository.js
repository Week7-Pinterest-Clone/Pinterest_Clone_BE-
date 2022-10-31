const { Post, User, Save, Comment, Like } = require('../models');

class PostRepository {
  //게시글전체조회
  findAllPost = async () => {
    const allPost = await Post.findAll({
      include: { model: User },
    });

    return allPost;
  };
  //게시글상세조회
  findOnePost = async (postId, userId) => {
    const postsOne = await Post.findOne({
      where: { postId },
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            { model: User },
            { model: Like, where: { userId: userId }, required: false },
          ],
        },
      ],
    });
    console.log(postsOne);
    return postsOne;
  };

  //게시글작성자 찾기
  findAuthor = async (postId) => {
    return await Post.findByPk(postId);
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
  deletePosts = async (postId) => {
    const deletePost = Post.destroy({
      where: { postId },
    });

    return deletePost;
  };

  //게시글 저장 (찜하기)

  findSave = async ({ postId, userId }) => {
    const findSave = await Save.findOne({ where: { userId, postId } });
    return findSave;
  };
  createSave = async (postId, userId) => {
    const savedAt = new Date();
    await Save.create({ userId: userId, postId: postId, savedAt: savedAt });
  };
  destroysave = async (postId, userId) => {
    await Save.destroy({ where: { postId: postId, userId: userId } });
  };

  // 이미지 Url 보내기
  uploadImages = async (uploadedImages, userId, postId) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(userId);
    const updateImageUrl = await Post.update(
      { postImg: uploadedImages },
      { where: { userId, postId } }
    );

    return updateImageUrl;
  };
}

module.exports = PostRepository;
