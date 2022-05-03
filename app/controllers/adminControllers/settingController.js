const Setting = require('../../models/settingModel');
const catchAsync = require('../../services/catchAsync');

exports.index = catchAsync(async (req, res, next) => {
  const result = await Setting.find();
  console.log(result);
  let config = {};
  result.forEach((configRow) => {
    config[configRow.setting_name] = configRow.setting_value;
  });
  res.status(200).render('admin/settings', {
    layout: 'admin',
    title: 'تنظیمات بلاگ',
    settingActive: 'active',
    config,
    helpers: {
      isChecked: function (v1, options) {
        return Number(v1) == 1 ? options.fn(this) : options.inverse(this);
      },
    },
  });
});

exports.updateSetting = catchAsync(async (req, res, next) => {
  const updatedSetting = {
    website_name: req.body.website_name,
    website_description: req.body.website_description,
    posts_count: req.body.posts_count,
    do_users_can_comment: req.body.do_users_can_comment || 0,
    do_users_can_signin: req.body.do_users_can_signin || 0,
  };
  await Setting.update(updatedSetting);

  res.redirect('/admin/settings');
});
