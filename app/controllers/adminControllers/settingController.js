exports.index = (req, res, next) => {
  res.status(200).render('admin/settings', {
    layout: 'admin',
    title: 'تنظیمات بلاگ',
    settingActive: 'active',
  });
};
