const { Comment } = require('../models');

const commentData = [
    {
        comment: "Never did I ever, think building a simple website could be so complex",
        user_id: 2,
        post_id: 2,
        
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;