const ORM = require('../models/ORMModel');
const db = require('../../database');

class settingModel extends ORM {
  constructor(modelName) {
    super(modelName);
  }

  async update(updatedSettings) {
    await Promise.all(
      Object.keys(updatedSettings).map((settingName) => {
        return db.query(
          `UPDATE ${this.modelName} SET setting_value = '${updatedSettings[settingName]}' WHERE setting_name = '${settingName}'`
        );
      })
    );
    return true;
  }
}

module.exports = new settingModel('settings');
