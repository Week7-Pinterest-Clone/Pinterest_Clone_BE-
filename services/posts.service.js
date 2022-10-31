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
  findOnePost = async (postId, userId) => {
    console.log('포스트서비스');
    console.log(userId);
    const postsOne = await this.postRepository.findOnePost(postId, userId);
    const commentArray = postsOne.Comments;
    const commentData = commentArray.map((x) => {
      let boolean;

      x.Likes.length ? (boolean = true) : (boolean = false);
      return {
        userId: x.userId,
        nickname: x.User.nickname,
        user_img: 'img_url',
        comment: x.comment,
        likeCount: x.likeCount,
        isLike: boolean,
      };
    });
    return {
      userId: postsOne.userId,
      postId: postsOne.postId,
      userId: postsOne.userId,
      title: postsOne.title,
      content: postsOne.content,
      img: 'img_url',
      nickname: postsOne.User.nickname,
      postImg: postsOne.postImg,
      createdAt: postsOne.createdAt,
      updatedAt: postsOne.updatedAt,
      comment: commentData,
    };
  };

  //게시글작성자찾기
  findAuthor = async (postId) => {
    return await this.postRepository.findAuthor(postId);
  };

  //게시글업로드
  createPosts = async (userId, title, content) => {
    await this.postRepository.createPosts(userId, title, content);
  };

  //게시글 삭제
  deletePosts = async (postId, userId) => {
    const findByauthor = await this.postRepository.findOnePost(postId);
    if (!findByauthor) throw new Error('잘못된 요청입니다');
    if (findByauthor.userId !== userId)
      throw new Error('본인만 삭제할 수 있습니다');

    const deletePost = await this.postRepository.deletePosts(postId);
    return {
      postId: deletePost.postId,
    };
  };

  //게시글 저장 (찜하기)
  savePosts = async ({ postId, userId }) => {
    const findSave = await this.postRepository.findSave({ postId, userId });
    if (!findSave) {
      await this.postRepository.createSave(postId, userId);
      return { msg: '게시글이 저장되었습니다' };
    } else {
      await this.postRepository.destroysave(postId, userId);
      return { msg: '게시글 저장이 취소되었습니다' };
    }
  };
}

module.exports = PostService;
