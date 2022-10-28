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
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likesCount: post.likesCount,
      };
    });
  };

  //게시글상세조회
  findOnePost = async (postId) => {
    const postsOne = await this.postRepository.findOnePost(postId);

    return {
      postId: postsOne.postId,
      nickname: postsOne.nickname,
      title: postsOne.title,
      content: postsOne.content,
      createdAt: postsOne.createdAt,
      updatedAt: postsOne.updatedAt,
    };
  };

  //게시글업로드
  createPost = async (userId, title, content, img) => {
    const createPostData = await this.postRepository.createPost({
      userId: userId,
      title: title,
      content: content,
      img: img_url,
    });
    return {
      postId: createPostData.null,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  //게시글 삭제
  deletePost = async (postId, userId) => {
    try {
      const deletePost = await this.postRepository.deletePost(postId, userId);
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
