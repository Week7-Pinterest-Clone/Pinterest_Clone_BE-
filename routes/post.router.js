const express = require('express');
const indexRouter = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

//게시글업로드
router.post('/', postsController.createPosts);
// //게시글 이미지 업로드
// router.post('/:postId/image', postsController.createImgPosts);
//게시글전체조회
router.get('/', postsController.getPosts);
//게시글상세조회
router.get('/:postId', postsController.getOnePosts);
//게시글 삭제
router.delete('/:postId', postsController.deletePosts);
//게시글 저장 (찜하기)
router.put('/:postId', postsController.savePosts);



module.exports = router;
