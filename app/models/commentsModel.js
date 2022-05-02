const db = require('@database');
const ORM = require('./ORMModel');

class Comment extends ORM {
  constructor(modelName) {
    super(modelName);
  }
  async findAllWithAuthorNameAndPostName(page = 1, limit = 10) {
    const skip = (page - 1) * 10;

    const [result] = await db.query(`
    SELECT comments.*,users.full_name,posts.title FROM comments
    LEFT JOIN users ON comments.user_id = users.id
    LEFT JOIN posts ON post_id = posts.id
    ORDER BY created_at DESC
    LIMIT ${skip},${limit}
    `);

    return result;
  }
}

module.exports = new Comment('comments');
