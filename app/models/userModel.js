const ORM = require('./ORMModel');
const db = require('@database');

class userModel extends ORM {
  constructor(nameModel) {
    super(nameModel);
  }

  async findUsersAdmin() {
    const [admins] = await db.query(
      `SELECT full_name,id FROM users WHERE role = 1`
    );
    console.log(admins);
    return admins;
  }
}

module.exports = new userModel('users');
