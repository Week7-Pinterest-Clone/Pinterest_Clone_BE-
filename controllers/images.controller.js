const ImageService = require("../services/images.service");
const PostsService = require("../services/posts.service");
const UserService = require("../services/users.service")
const aws = require("aws-sdk");
//const sharp = require("sharp");
require("dotenv").config();

class ImagesController {
  imageService = new ImageService();
  postsService = new PostsService();
  usersService = new UserService();

  uploadImage = async (req, res, next) => {
    const { email } = res.locals.user;
    //console.log(email, "이메일")
    const { userId } = req.params;
    //console.log(userId)
    const findUser = await this.usersService.profile(userId)
    //console.log(findUser)
    if (email !== findUser.email) {
      return res.status(400).json({ errorMessage: "권한이 없습니다." });
    }
    try {
      //console.log(req.file);
      const image = req.files;
      const value = Object.values({image})
      const imageUrl = value[0][0].transforms[0].location
      // console.log(value, "벨류벨류")

      if (!image) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).json({ imageUrl });

      await this.imageService.uploadImage(imageUrl, userId);
    } catch (error) {
      next(error);
    }
  };

  // 게시글(post) 이미지
  uploadImages = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    //console.log(postId);
    const findPost = await this.postsService.findOnePost(postId);
    //console.log(findPost);
    if (userId !== findPost.userId) {
      return res.status(400).json({ errorMessage: "권한이 없습니다." });
    }
    try {
      const images = req.files;
      const values = Object.values({images})
      const imageUrls = values[0][0].transforms[0].location

      // const imageUrls = images.map((img) => img.location);
      //console.log(images, "불러봅시다")
      console.log(imageUrls, "벨류벨류")


      if (!images) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }

      // sharp(imageUrls)  // 압축할 이미지 경로
      // .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
      // .withMetadata()	// 이미지의 exif데이터 유지
      // .toBuffer((err, buffer) => {
      //   if (err) throw err;
      //   // 압축된 파일 새로 저장(덮어씌우기)
      //   fs.writeFile(imageUrls, buffer, (err) => {
      //     if (err) throw err;
      //   });
      // });


      await this.imageService.uploadImages(imageUrls, userId, postId);

      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const findPost = await this.postsService.findOnePost(postId);
    const findkey = findPost.postImg.split("/")[3];
    console.log(findkey);

    if (userId !== findPost.userId) {
      return res.status(400).json({ errorMessage: "권한이 없습니다." });
    }

    try {

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
          res.status(200).json({ message: "이미지와 게시글이 삭제되었습니다." });
          next();
        }

      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImagesController;
