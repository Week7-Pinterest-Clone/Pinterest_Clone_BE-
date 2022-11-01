const PostRepository = require("../repositories/posts.repository");
const UserRepository = require("../repositories/users.repository");

class ImageService {
  postRepository = new PostRepository();
  userRepository = new UserRepository();

  // 이미지url을 DB에 저장할 필요가 없어 보입니다.
  createPost = async (imageUrls, userId, title, content) => {
    const createPostData = await this.postRepository.createPost(
      imageUrls,
      userId,
      title,
      content
    );
    return createPostData;
  };

  uploadImage = async (imageUrl, userId) => {
    const foundData = await this.userRepository.findById(userId);
    const userIdData = foundData.userId;
    // console.log("유저:", userIdData, "잘 받아오나 보자")
    if (!foundData) {
      throw new ValidationError("사용자를 찾을 수 없습니다.");
    }

    const uploadImage = imageUrl;
    // console.log(uploadImage, "아무거나");

    const uploadImagesData = await this.userRepository.uploadImage(
      uploadImage,
      userId
    );
    return uploadImagesData;
  };
}

module.exports = ImageService;
