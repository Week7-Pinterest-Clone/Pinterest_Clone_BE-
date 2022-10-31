const PostRepository = require("../repositories/posts.repository");
const UserRepository = require("../repositories/users.repository")

class ImageService {
  postRepository = new PostRepository();
  userRepository = new UserRepository();

  // 이미지url을 DB에 저장할 필요가 없어 보입니다.
  uploadImages = async (imageUrls, userId, postId) => {
    const foundData = await this.postRepository.findOnePost(postId, userId);
    // console.log("포스트Id:", foundData.postId, "사용자Id:", foundData.userId, "잘 받아오나 보자")
    if (!foundData) {
      throw new ValidationError("게시글을 찾을 수 없습니다.");
    }

    const uploadImages = imageUrls;
    // console.log(uploadImages, "아무거나");

    const uploadImagesData = await this.postRepository.uploadImages(
      uploadImages,
      userId,
      postId
    );
    return uploadImagesData;
  };

  uploadImage = async (imageUrl, userId) => {
    const foundData = await this.userRepository.findById(userId);
    const userIdData = foundData.userId
    // console.log("유저:", userIdData, "잘 받아오나 보자")
    if (!foundData) {
      throw new ValidationError("사용자를 찾을 수 없습니다.");
    }

    const uploadImage = imageUrl;
    // console.log(uploadImage, "아무거나");

    const uploadImagesData = await this.userRepository.uploadImage(
      uploadImage,
      userId,
    );
    return uploadImagesData;
  };

}

module.exports = ImageService;