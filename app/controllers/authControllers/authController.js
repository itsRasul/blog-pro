const { comparePassword } = require('../../services/hashPassword');
const AppError = require('../../services/AppError');
const catchAsync = require('../../services/catchAsync');
const User = require('../../models/userModel');

exports.loginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('auth/login', {
    layout: 'auth',
    title: 'ورود به سایت',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  // check if user exists.

  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError('ایمیل یا رمز عبور صحیح نمیباشد', 404);
  }
  const resultHash = await comparePassword(password, user.password);
  if (!resultHash) {
    throw new AppError('ایمیل یا رمز عبور صحیح نمیباشد.', 404);
  }
  req.user = user;
  // user exists
  res.redirect(
    `${user.role == 2 || user.role == 1 ? '/admin/dashboard' : '/'}`
  );
});

exports.signinPage = catchAsync(async (req, res, next) => {
  res.status(200).render('auth/signin', {
    layout: 'auth',
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  res.send('this is sign in');
});
