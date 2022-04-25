const Post = require('../../models/postModel');

exports.index = async (req, res, next) => {
  const posts = await Post.find();
  // add created_at Date in readble way
  posts.forEach(
    (el) =>
      (el.created_at_readble = new Date(el.created_at).toLocaleString('fa-ir', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }))
  );

  res.status(200).render('admin/posts', {
    layout: 'admin',
    title: 'نوشتن مطلب',
    postActive: 'active',
    posts,
  });
};

exports.newPostPage = async (req, res, next) => {
  res.status(200).render('admin/newPost', {
    layout: 'admin',
    title: 'نوشتن مطلب جدید',
    postActive: 'active',
  });
};
