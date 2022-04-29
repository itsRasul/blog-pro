const AppError = require('../../services/AppError');
const Comment = require('../../models/commentsModel');
const catchAsync = require('../../services/catchAsync');
const { toPersianDate } = require('../../services/dateServices');

exports.index = catchAsync(async (req, res, next) => {
  const comments = await Comment.findAllWithAuthorNameAndPostName();
  // add readable date
  comments.forEach((comment) => {
    comment.created_at_readable = toPersianDate(comment.created_at);
  });
  res.status(200).render('admin/comments', {
    layout: 'admin',
    title: 'مدیریت دیدگاه ها',
    commentActive: 'active',
    comments,
  });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { commentId, status } = req.params;
  if (Number(status) != 1 && Number(status) != 0) {
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
  const result = await Comment.deleteById(commentId);

  res.redirect('/admin/comments');
});
