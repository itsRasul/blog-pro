const bcrypt = require('bcrypt');
const AppError = require('./AppError');

exports.hashPassword = async (plainPassword) => {
  try {
    const hash = await bcrypt.hash(plainPassword, 12);
    return hash;
  } catch (err) {
    throw new AppError('در پردازش مشکلی پیش آمده است!', 500);
  }
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (err) {
    throw new AppError('در پردازش مشکلی پیش آمده است!', 500);
  }
};
