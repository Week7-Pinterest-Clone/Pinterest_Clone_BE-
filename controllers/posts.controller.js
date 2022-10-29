const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  //게시글전체조회
  getPosts = async (req, res, next) => {
    const allPost = await this.postService.findAllPost();
    res.status(200).json({ data: allPost });
  };

  //게시글 상세조회
  getOnePosts = async (req, res, next) => {
    const postId = req.params.postId;
    const postsOne = await this.postService.findOnePost(postId);

    res.status(200).json({ data: postsOne });
  };

  //게시글업로드
  createPosts = async (req, res, next) => {
    const { userId} = res.locals.user;
    const { title, content } = req.body;
    await this.postService.createPosts(
      userId,
      title,
      content,
    );
    res.status(201).json({msg:'게시글업로드완료'});
  };

  //게시글 삭제
  deletePosts = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    await this.postService.deletePosts(postId, userId);
    res.status(200).send({msg:'게시글이 삭제되었습니다'});
  };

  //게시글 저장 (찜하기)
  savePosts = async (req, res, next) => {
    // console.log('컨트롤러');
    // console.log(findSave);
    const {postId} =req.params
    const {userId} = res.locals.user
    const resultmsg = await this.postService.savePosts({postId, userId})

    res.status(201).send(resultmsg);
  };

  


}

module.exports = PostsController;
