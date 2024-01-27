const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

const seedUser = require('./userData');//seed file
const seedPost = require('./postData');//seed file


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPost();
  console.log('\n----- POSTS SEEDED -----\n');



  process.exit(0);
};

seedAll();
