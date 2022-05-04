const { hashPassword } = require('../../services/hashPassword');
const User = require('../../models/userModel');
const catchAsync = require('../../services/catchAsync');
// const AppError = require('../../services/AppError');
const { toPersianDate } = require('../../services/dateServices');
const AppError = require('../../services/AppError');

exports.index = catchAsync(async (req, res, next) => {
  let { page = 1, typeUsers } = req.query;

  const users = await User.find(page, 10, typeUsers);
  users.forEach((user) => {
    if (user.role == 0) user.role_name = 'کاربری';
    else if (user.role == 1) user.role_name = 'نویسنده';
    else if (user.role == 2) user.role_name = 'ادمین';
  });
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
  if (req.body.password) {
    var hashPass = await hashPassword(req.body.password);
  }
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashPass,
    role: req.body.role,
  };

  const result = await User.create(userData);
  console.log(result);
  if (result.affectedRows > 0) {
    return res.redirect('/admin/users');
  }
  return res.render('errors/error', {
    errorMsg: 'در ایجاد کاربر مشکلی پیش آمده است!',
    errorStatusCode: 400,
  });
});

exports.editUserPage = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const [user] = await User.findById(userId);
  console.log(user);
  res.render('admin/editUser', {
    layout: 'admin',
    title: 'ویرایش کاربر',
    userActive: 'active',
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    userId: user.id,
    helpers: {
      isRoleUser: function (v1, options) {
        return v1 == user.role ? options.fn(this) : options.inverse(this);
      },
    },
  });
});

exports.edit = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  if (!req.body.password) {
    throw new AppError('لطفا رمز عبور را وارد نمایید', 400);
  }
  const hashPass = await hashPassword(req.body.password);
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashPass,
    role: req.body.role,
  };

  const result = await User.updateById(userId, userData);
  if (result.affectedRows > 0) {
    return res.redirect('/admin/users');
  }
  res.render('errors/error', {
    layout: 'error',
    title: 'error',
    errorMsg: 'در ویرایش کاربر مشکلی پیش آمده است!',
    errorStatusCode: 400,
  });
});
