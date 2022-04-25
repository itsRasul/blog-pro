const ORM = require('./ORMModel');

class PostModel extends ORM {
  constructor(modelName) {
    super(modelName);
  }
}

module.exports = new PostModel('posts');
