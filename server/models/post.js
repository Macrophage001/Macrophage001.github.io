const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: [String], required: false }
})

const Posts = [
    {
        title: 'Test Title',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem temporibus, culpa molestias vero corporis officia accusantium necessitatibus, voluptate perspiciatis natus adipisci fugiat. Architecto, sed! Porro, aliquam facilis neque quam quisquam, eius magni, illum dolorem a atque modi. Minima qui laborum asperiores nisi quo minus dolor doloremque facere quam cupiditate?',
        tags: [
            'tag1',
            'tag2',
            'tag3'
        ]
    },
    {
        title: 'Test Title 2',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem temporibus, culpa molestias vero corporis officia accusantium necessitatibus, voluptate perspiciatis natus adipisci fugiat. Architecto, sed! Porro, aliquam facilis neque quam quisquam, eius magni, illum dolorem a atque modi. Minima qui laborum asperiores nisi quo minus dolor doloremque facere quam cupiditate?',
        tags: [
            'tag1',
            'tag2',
            'tag3'
        ]
    },
    {
        title: 'Test Title 3',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem temporibus, culpa molestias vero corporis officia accusantium necessitatibus, voluptate perspiciatis natus adipisci fugiat. Architecto, sed! Porro, aliquam facilis neque quam quisquam, eius magni, illum dolorem a atque modi. Minima qui laborum asperiores nisi quo minus dolor doloremque facere quam cupiditate?',
        tags: [
            'tag1',
            'tag2',
            'tag3'
        ]
    },
    {
        title: 'Test Title 4',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem temporibus, culpa molestias vero corporis officia accusantium necessitatibus, voluptate perspiciatis natus adipisci fugiat. Architecto, sed! Porro, aliquam facilis neque quam quisquam, eius magni, illum dolorem a atque modi. Minima qui laborum asperiores nisi quo minus dolor doloremque facere quam cupiditate?',
        tags: [
            'tag1',
            'tag2',
            'tag3'
        ]
    }
]

module.exports = { Posts, Post: mongoose.model('Post', Post) }