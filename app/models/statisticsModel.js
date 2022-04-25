const db = require('../../database');

exports.getCountAllUser = async () => {
  const [result] = await db.query('SELECT COUNT(id) as totalUsers FROM users');
  return result[0].totalUsers;
};

exports.getCountAllComments = async () => {
  const [result] = await db.query(
    'SELECT COUNT(id) as totalComments FROM comments'
  );
  return result[0].totalComments;
};

exports.getCountAllViews = async () => {
  const [result] = await db.query('SELECT SUM(views) as totalViews FROM posts');
  return result[0].totalViews;
};

exports.getCountAllPosts = async () => {
  const [result] = await db.query('SELECT COUNT(id) as totalPosts FROM posts');
  return result[0].totalPosts;
};
