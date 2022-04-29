exports.notEmpty = (data) => {
  let errors = [];
  for (let el in data) {
    if (data[el] === '') {
      errors.push(`${el} نمیتواند خالی باشد!`);
    }
  }
  return errors;
};
