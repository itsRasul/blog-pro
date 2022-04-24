exports.index = (req, res, next) => {
  res.status(200).render('admin/comments', {
    layout: 'admin',
    title: 'مدیریت دیدگاه ها',
    commentActive: 'active',
  });
};
