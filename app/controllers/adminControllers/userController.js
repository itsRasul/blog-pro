const User = require('../../models/userModel');
const catchAsync = require('../../services/catchAsync');
// const AppError = require('../../services/AppError');
const { toPersianDate } = require('../../services/dateServices');

exports.index = catchAsync(async (req, res, next) => {
  let { page = 1 } = req.query;

  const users = await User.find(page, 10);

  users.forEach((el) => {
    el.created_at_readable = toPersianDate(el.created_at);
  });

  const countPage = Math.ceil(users.length / 10);
  const countPageArr = [...Array(countPage).keys()];
  countPageArr.shift();
  countPageArr.push(countPageArr.length + 1);

  res.status(200).render('admin/users', {
    layout: 'admin',
    title: 'مدیریت کاربران',
    userActive: 'active',
    users,
    countPageArr,
    currentPage: page,
    nextPage: Number(page) + 1,
    prevPage: Number(page) - 1,
    helpers: {
      ifCond: function (v1, options) {
        return Number(v1) == Number(page)
          ? options.fn(this)
          : options.inverse(this);
      },
    },
  });
});
