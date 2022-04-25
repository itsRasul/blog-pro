const statisticsModel = require('@models/statisticsModel');

exports.index = async (req, res, next) => {
  let data = {
    totalUsers: await statisticsModel.getCountAllUser(),
    totalComments: await statisticsModel.getCountAllComments(),
    totalViews: await statisticsModel.getCountAllViews(),
    totalPosts: await statisticsModel.getCountAllPosts(),
  };
  res.status(200).render('admin/dashboard', {
    layout: 'admin',
    title: 'داشبورد بلاگ',
    dashboardActive: 'active',
    ...data,
  });
};
