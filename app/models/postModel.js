const ORM = require('./ORMModel');
const db = require('@database');
class PostModel extends ORM {
  constructor(modelName) {
    super(modelName);
  }

  // async findById(id) {
  //   const [result] = await db.query(
  //     `
  //       SELECT posts.*,users.full_name FROM ${this.modelName} WHERE id = ${id}
  //     `
  //   );
  //   return result;
  // }

  async findAllPostsWithAuthorName(page, limit) {
    // LIMIT skip,limit
    // skip 0 page 1 limit 10 = LIMIT 0,10
    // skip 10 page 2 limit 10 = LIMIT 10,10
    // skip 20 page 3 limit 10 = LIMIT 0,10
    let skip = (page - 1) * 10;
    const [result] = await db.query(`
      SELECT posts.*, users.full_name
      FROM posts
      JOIN users ON posts.author_id = users.id
      ORDER BY created_at DESC
      LIMIT ${skip},${limit}
    `);

    return result;
  }

  async countPosts() {
    const [counts] = await db.query(`SELECT COUNT(id) as count FROM posts`);
    return counts[0].count;
  }
}

module.exports = new PostModel('posts');
