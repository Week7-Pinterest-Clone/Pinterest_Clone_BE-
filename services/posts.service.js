const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  //게시글전체조회
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.User.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  //게시글상세조회
  findOnePost = async (postId) => {
    const postsOne = await this.postRepository.findOnePost(postId);
    console.log(postsOne);
    return {
      postId: postsOne.postId,
      title: postsOne.title,
      content: postsOne.content,
      nickname: postsOne.User.nickname,
      createdAt: postsOne.createdAt,
      updatedAt: postsOne.updatedAt,
    };
  };

  //게시글업로드
  createPosts = async (userId, title, content) => {
    console.log('서비스');
    console.log(title, content);
    await this.postRepository.createPosts(userId, title, content);
  };

  //게시글 삭제
  deletePosts = async (postId, userId) => {
    try {
      const deletePost = await this.postRepository.deletePosts(postId, userId);
      return {
        postId: deletePost.postId,
      };
    } catch (e) {
      return {
        msg: '게시글 삭제에 실패했습니다',
        status: 400,
      };
    }
  };

  //게시글 저장 (찜하기)
  savePosts = async () => {
    try {
      const savePosts = await this.postRepository.savePosts();
      return {
        postId: savePosts.postId,
      };
    } catch (error) {
      return {
        msg: '게시글저장에 실패했습니다',
        status: 400,
      };
    }
  };
}

module.exports = PostService;
