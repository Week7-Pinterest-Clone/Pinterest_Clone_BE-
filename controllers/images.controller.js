const ImageService = require("../services/images.service");
const PostsService = require("../services/posts.service");
const aws = require("aws-sdk");
require("dotenv").config();

class ImagesController {
  imageService = new ImageService();
  postsService = new PostsService();

  uploadImage = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      console.log(req.file);
      const imageUrl = req.file.location;
      if (!imageUrl) {
        es.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).json({ imageUrl });

      await this.imageService.uploadImages(imageUrl, userId, postId);
    } catch (error) {
      next(error);
    }
  };

  // 게시글(post) 이미지
  uploadImages = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    console.log(postId);
    const findPost = await this.postsService.findOnePost(postId);
    console.log(findPost);
    if (userId !== findPost.userId) {
      return res.status(400).json({ errorMessage: "권한이 없습니다." });
    }
    try {
      const images = req.files;
      const imageUrls = images.map((img) => img.location);

      if (!images) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }
      await this.imageService.uploadImages(imageUrls, userId, postId);

      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req, res, next) => {
    try {
      const { imgname } = await this.postsService.findOnePost.postImg;
      console.log(imgname);

      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imgname,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          res.status(200).json({ message: "이미지가 지워졌네요." });
        }
        /*
      data = {
      }
      */
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImagesController;
