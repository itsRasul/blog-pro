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

  async find(page = 1, limit = 10, typeUsers) {
    let skip = (page - 1) * 10;
    // typeUsers = role
    console.log(typeUsers);
    const [results] = await db.query(`
      SELECT * FROM users
      WHERE ${typeUsers ? `role = ${typeUsers}` : `TRUE`}
      ORDER BY created_at DESC
      LIMIT ${skip},${limit}
    `);
    return results;
  }
}

module.exports = new userModel('users');
