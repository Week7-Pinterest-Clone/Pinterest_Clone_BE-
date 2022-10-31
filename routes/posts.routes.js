const { Router } = require("express");
const postsRouter = Router();
const upload = require('../modules/posts.multer');

const authMiddleware = require("../middlewares/authMiddleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

//게시글업로드
postsRouter.post("/", authMiddleware, postsController.createPosts);
//게시글전체조회
postsRouter.get('/',authMiddleware, postsController.getPosts);
//게시글상세조회
postsRouter.get('/:postId',authMiddleware, postsController.getOnePosts);
//게시글 삭제
postsRouter.delete('/:postId',authMiddleware, imagesController.deleteImage, postsController.deletePosts);

//게시글 저장 (찜하기)
postsRouter.put("/:postId", authMiddleware, postsController.savePosts);
// 게시글 이미지 업로드
postsRouter.post('/:postId/image', authMiddleware, upload.array('image',5), imagesController.uploadImages);

// // 게시글 이미지 삭제
// postsRouter.delete('/:postId/image', authMiddleware, imagesController.deleteImage);

module.exports = postsRouter;
