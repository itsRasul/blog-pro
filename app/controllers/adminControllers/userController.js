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

exports.remove = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const result = await User.deleteById(userId);
  console.log(result);
  if (result.affectedRows > 0) {
    // we have removed a user successfully!
    res.redirect('/admin/users');
  }
  res.render('errors/error', {
    errorMsg: 'کاربری با این id یافت نشد!',
    errorStatusCode: 404,
  });
});

exports.createUserPage = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/newUser', {
    layout: 'admin',
    userActive: 'active',
    title: 'ایجاد کاربر جدید',
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const userDate = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const result = await User.create(userDate);
  console.log(result);
  if (result.affectedRows > 0) {
    return res.redirect('/admin/users');
  }
  return res.render('errors/error', {
    errorMsg: 'در ایجاد کاربر مشکلی پیش آمده است!',
    errorStatusCode: 400,
  });
});
