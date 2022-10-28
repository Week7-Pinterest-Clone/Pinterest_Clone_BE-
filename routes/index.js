const { Router } = require('express');
const router = Router();

const postsRouter = require('./posts.routes');

router.use('/posts', postsRouter);

module.exports = router;