exports.index = (req, res, next) => {
  let data = {
    totalUsers: 0,
    totalComments: 0,
    totalViews: 0,
    totalPosts: 0,
  };
  res.status(200).render('dashboard', {
    layout: 'admin',
    title: 'داشبورد بلاگ',
    dashboardActive: 'active',
    ...data,
  });
};
