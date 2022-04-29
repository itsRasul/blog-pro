const catchAsync = require('../../services/catchAsync');
const AppError = require('../../services/AppError');
const postValidator = require('../../validators/postValidator');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const { toPersianDate } = require('@services/dateServices');

exports.index = async (req, res, next) => {
  const { page } = req.params;
  const posts = await Post.findAllPostsWithAuthorName(page, 10);
  const count = await Post.countPosts();
  const pages = Math.ceil(count / 10);
  const pageCount = [...Array(pages).keys()];
  pageCount.shift();
  pageCount.push(pageCount.length + 1);
  // add created_at Date in readble way
  posts.forEach((el) => (el.created_at_readble = toPersianDate(el.created_at)));

  res.status(200).render('admin/posts', {
    layout: 'admin',
    title: 'نوشتن مطلب',
    postActive: 'active',
    posts,
    pageCount,
    nextPage: Number(page) + 1,
    prePage: page - 1,
    currentPage: page,
  });
};

exports.newPostPage = async (req, res, next) => {
  const admins = await User.findUsersAdmin();
  res.status(200).render('admin/newPost', {
    layout: 'admin',
    title: 'نوشتن مطلب جدید',
    postActive: 'active',
    admins,
  });
};

exports.createPost = async (req, res, next) => {
  try {
    const data = {
      author_id: req.body.author_id,
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      status: req.body.status,
    };
    // data validator (check everything not be empty!)
    const errors = postValidator.notEmpty(data);

    if (errors.length > 0) {
      // there is an Error
      const admins = await User.findUsersAdmin();
      return res.status(200).render('admin/newPost', {
        layout: 'admin',
        title: 'نوشتن مطلب جدید',
        postActive: 'active',
        admins,
        errors,
        hasError: errors.length > 0,
      });
    }

    await Post.create(data);
    res.redirect('/admin/posts/page/1');
  } catch (err) {
    next(err);
    console.log({ err });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return next(new AppError('لطفا ایدی پست را در درخواست اعلام کنید!', 400));
    }
    await Post.deleteById(postId);
    return res.redirect('/admin/posts/page/1');
  } catch (err) {
    return next(err);
  }
};

exports.editPage = async (req, res, next) => {
  const { postId } = req.params;

  const [post] = await Post.findById(postId);
  const admins = await User.findUsersAdmin();
  res.status(200).render('admin/edit', {
    layout: 'admin',
    title: 'نوشتن مطلب جدید',
    postActive: 'active',
    admins,
    post,
  });
};

exports.update = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const postData = {
    author_id: req.body.author_id,
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
  };

  const errors = postValidator.notEmpty(postData);

  if (errors.length > 0) {
    // there is an Error
    const admins = await User.findUsersAdmin();
    return res.status(200).render('admin/newPost', {
      layout: 'admin',
      title: 'نوشتن مطلب جدید',
      postActive: 'active',
      admins,
      errors,
      hasError: errors.length > 0,
    });
  }

  await Post.updateById(postId, postData);

  res.redirect('/admin/posts/page/1');
});
