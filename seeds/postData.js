const { Post } = require('../models');

const postData = [
    {
        title: "Web development is fun?",
        content: "We take for granted how easy it is to use the web. As a developer, you quickly reallize that a lot goes into creating a website, or even a simple webpage.",
        user_id: 1
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;