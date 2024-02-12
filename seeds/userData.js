const { User } = require('../models');

const userData = [
  {
    username: "Sal",
    email: "sal@hotmail.com",
    password: "password12345"
  },
  {
    username: "Steve",
    email: "Steve@hotmail.com",
    password: "password54321"
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;