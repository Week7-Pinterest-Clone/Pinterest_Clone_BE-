const PostRepository = require("../repositories/posts.repository");
const UserRepository = require("../repositories/users.repository");

class PostService {
  postRepository = new PostRepository();
  userRepository = new UserRepository();
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
        img: post.postImg,
      };
    });
  };

  //게시글상세조회
  findOnePost = async (postId, userId) => {
    const postsOne = await this.postRepository.findOnePost(postId, userId);
    const commentArray = postsOne.Comments;
    const userData = await this.userRepository.findById(userId);
    let isSave;
    postsOne.Saves.length ? (isSave = true) : (isSave = false);
    const commentData = commentArray.map((x) => {
      let boolean;

      x.Likes.length ? (boolean = true) : (boolean = false);
      return {
        userId: x.userId,
        commentId: x.commentId, //있는게 좋지않을까..?
        nickname: x.User.nickname,
        user_img: x.User.userImg, // 댓글작성자프로필
        comment: x.comment,
        likeCount: x.likeCount,
        isLike: boolean,
      };
    });
    return {
      userId: postsOne.userId,
      postId: postsOne.postId,
      title: postsOne.title,
      content: postsOne.content,
      img: postsOne.postImg, //게시글이미지
      nickname: postsOne.User.nickname,
      profile_img: postsOne.User.userImg, //작성자프로필
      myprofile: userData.userImg, //로그인유저 프로필
      createdAt: postsOne.createdAt,
      updatedAt: postsOne.updatedAt,
      isSave: isSave,
      comment: commentData,
    };
  };

  //게시글작성자찾기
  findAuthor = async (postId) => {
    return await this.postRepository.findAuthor(postId);
  };

  //게시글업로드
  // createPosts = async (userId, title, content) => {
  //   await this.postRepository.createPosts(userId, title, content);
  // };

  //게시글 삭제
  deletePosts = async (postId, userId) => {
    const findByauthor = await this.postRepository.findAuthor(postId);
    if (!findByauthor) throw new Error("잘못된 요청입니다");
    if (findByauthor.userId !== userId)
      throw new Error("본인만 삭제할 수 있습니다");

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
      return { msg: "게시글이 저장되었습니다" };
    } else {
      await this.postRepository.destroysave(postId, userId);
      return { msg: "게시글 저장이 취소되었습니다" };
    }
  };
}

module.exports = PostService;
