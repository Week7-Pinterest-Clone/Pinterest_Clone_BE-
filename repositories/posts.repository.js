const { Posts } = require('../models');

class PostRepository {
  //게시글전체조회
    findAllPost = async () => {
    const allPost = await Posts.findAll();

    return allPost;
  }
  //게시글상세조회
  findOnePost = async (postId) =>{
    const postsOne = await Posts.findByPk(postId)

    return postsOne;
  }
  //게시글업로드
  createPost = async ( userId, nickname, title, content, like) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({ userId, nickname, title, content, like });

    return createPostData;
  }

  //게시글 삭제
  deletePost = async (postId, userId) => {
    const deletePost = Posts.destroy({
      where: { postId, userId},
    });
    return deletePost;
  };

    //게시글 저장 (찜하기)
    
}


module.exports = PostRepository;

