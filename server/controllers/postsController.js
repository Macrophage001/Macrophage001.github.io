const { Posts, Post } = require('../models/post');

const tryCatch = (t, c = (e => console.error('Error: ', e))) => {
    return function () {
        try {
            t(arguments)
        } catch (e) {
            c(e)
        }
    }
}
const dbFilter = id => ({ name: id })

const createPost = (req, res) => {
    tryCatch(async () => {
        let post = await Post.create(req.body);
        // console.log(req.body);
    })();
}

const getPosts = (req, res) => {
    // res.send(Posts);
    tryCatch(async () => {
        let posts = await Post.find({})
        console.log('Found posts', posts);
        res.send(posts);
    })();
}

module.exports = {
    getPosts,
    createPost
}