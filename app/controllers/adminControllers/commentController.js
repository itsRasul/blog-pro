const AppError = require('../../services/AppError');
const Comment = require('../../models/commentsModel');
const catchAsync = require('../../services/catchAsync');
const { toPersianDate } = require('../../services/dateServices');

exports.index = catchAsync(async (req, res, next) => {
  let { page } = req.query;
  page = page ? page : 1;
  const comments = await Comment.findAllWithAuthorNameAndPostName(page, 10);
  const countPage = comments.length;
  const countPageArr = [...Array(countPage).keys()];
  countPageArr.shift();
  countPageArr.push(countPageArr.length + 1);
  // add readable date
  comments.forEach((comment) => {
    comment.created_at_readable = toPersianDate(comment.created_at);
  });
  res.status(200).render('admin/comments', {
    layout: 'admin',
    title: 'مدیریت دیدگاه ها',
    commentActive: 'active',
    comments,
    currentPage: page,
    nextPage: Number(page) + 1,
    prevPage: Number(page) - 1,
    countPageArr,
    helpers: {
      ifCond: function (v1, options) {
        return v1 == page ? options.fn(this) : options.inverse(this);
      },
    },
  });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { commentId, status } = req.params;
  if (Number(status) != 0 && Number(status) != 1 && Number(status) != 2) {
    throw new AppError('status should be 0 or 1', 400);
  }
  const data = {
    status: Number(status),
  };

  await Comment.updateById(commentId, data);

  res.redirect('/admin/comments');
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  await Comment.deleteById(commentId);

  res.redirect('/admin/comments');
});
