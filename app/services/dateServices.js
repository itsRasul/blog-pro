exports.toPersianDate = (dateInput) =>
  new Date(dateInput).toLocaleString('fa-ir', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
