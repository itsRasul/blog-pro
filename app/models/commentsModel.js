const db = require('@database');
const ORM = require('./ORMModel');

class Comment extends ORM {
  constructor(modelName) {
    super(modelName);
  }
  async findAllWithAuthorNameAndPostName() {
    const [result] = await db.query(`
    SELECT comments.*,users.full_name,posts.title FROM comments
    LEFT JOIN users ON comments.user_id = users.id
    LEFT JOIN posts ON post_id = posts.id
    ORDER BY created_at DESC
    `);

    return result;
  }
}

module.exports = new Comment('comments');
