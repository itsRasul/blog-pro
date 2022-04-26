const numbers = ['۰', '١', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

exports.toPersianNumber = (input) =>
  input
    .split('')
    .map((el) => (numbers[el] ? numbers[el] : el))
    .join('');
