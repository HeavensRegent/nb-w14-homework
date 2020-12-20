const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = [];
  for (const blog of blogData) {
    blogs.push(
      await Blog.create(
        {
          ...blog,
          userId: users[Math.floor(Math.random() * users.length)].id,
        },
        {
          returning: true,
        }
      )
    );
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      userId: users[Math.floor(Math.random() * users.length)].id,
      blogId: blogs[Math.floor(Math.random() * blogs.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
