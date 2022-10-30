const { Router } = require("express");
const postsRouter = Router();
const upload = require('../modules/multer');

const authMiddleware = require("../middlewares/authMiddleware");

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const ImagesController = require('../controllers/images.controller')
const imagesController = new ImagesController()

//게시글업로드
postsRouter.post('/', authMiddleware, postsController.createPosts);
//게시글전체조회
postsRouter.get('/', postsController.getPosts);
//게시글상세조회
postsRouter.get('/:postId', postsController.getOnePosts);
//게시글 삭제
postsRouter.delete('/:postId',authMiddleware,  postsController.deletePosts);
//게시글 저장 (찜하기)
postsRouter.put('/:postId',authMiddleware,  postsController.savePosts);
// 게시글 이미지 업로드
postsRouter.post('/:postId/image', authMiddleware, upload.array('image',5), imagesController.uploadImages);

module.exports = postsRouter;
