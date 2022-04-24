exports.index = (req, res, next) => {
  res.status(200).render('admin/posts', {
    layout: 'admin',
    title: 'نوشتن مطلب',
    postActive: 'active',
  });
};
