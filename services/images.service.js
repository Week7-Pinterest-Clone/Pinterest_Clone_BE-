const PostRepository = require("../repositories/posts.repository");

class ImageService {
  postRepository = new PostRepository();

  // 이미지url을 DB에 저장할 필요가 없어 보입니다.
  uploadImages = async (imageUrls, userId, postId) => {
    const foundData = await this.postRepository.findOnePost(postId, userId);
    console.log("포스트Id:", foundData.postId, "사용자Id:", foundData.userId, "잘 받아오나 보자")
    if (!foundData) {
      throw new ValidationError("게시글을 찾을 수 없습니다.");
    }

    const uploadImages = imageUrls.join();
    console.log(uploadImages, "아무거나");

    const uploadImagesData = await this.postRepository.uploadImages(
      uploadImages,
      userId,
      postId
    );
    return uploadImagesData;
  };
}

module.exports = ImageService;