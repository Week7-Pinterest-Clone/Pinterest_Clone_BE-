const PostService = require("../services/posts.service");
const aws = require("aws-sdk");
require("dotenv").config();

class PostsController {
  postService = new PostService();

  //게시글전체조회
  getPosts = async (req, res, next) => {
    try {
      const allPost = await this.postService.findAllPost();
      res.status(200).json({ data: allPost });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  //게시글 상세조회
  getOnePosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const postId = req.params.postId;
      const postsOne = await this.postService.findOnePost(postId, userId);

      res.status(200).json(postsOne);
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  //게시글업로드
  createPosts = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      await this.postService.createPosts(userId, title, content);
      res.status(201).json({ ok: true, msg: "게시글업로드완료" });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  //게시글 삭제
  deletePosts = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      const findPost = await this.postService.findAuthor(postId);
      const findkey = findPost.postImg.split("/")[3];
      console.log(findkey);

      if (userId !== findPost.userId) {
        return res.status(400).json({ errorMessage: "권한이 없습니다." });
      }

      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: findkey,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          res.status(200);
          next();
        }
      });

      await this.postService.deletePosts(postId, userId);
      res.status(200).send({ ok: true, msg: "게시글이 삭제되었습니다" });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  //게시글 저장 (찜하기)
  savePosts = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const resultmsg = await this.postService.savePosts({ postId, userId });

      res.status(201).send(resultmsg);
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = PostsController;
