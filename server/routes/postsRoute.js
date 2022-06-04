const router = require('express').Router();
const { getPosts, createPost } = require('../controllers/postsController');

router
    .route('/')
    .get(getPosts)
    .post(createPost)

module.exports = router