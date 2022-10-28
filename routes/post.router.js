const express = require('express');
const indexRouter = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

//게시글업로드
//게시글 이미지 업로드
//게시글전체조회
//게시글상세조회
//게시글 삭제
//게시글 저장 (찜하기)

router.get('/', postsController.getPosts);

module.exports = router;
