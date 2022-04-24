exports.index = (req, res, next) => {
  res.status(200).render('admin/users', {
    layout: 'admin',
    title: 'مدیریت کاربران',
    userActive: 'active',
  });
};
