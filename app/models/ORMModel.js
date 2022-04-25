const db = require('../../database');

class ORM {
  constructor(modelName) {
    this.modelName = modelName;
  }
  async find() {
    console.log(this.modelName);
    const [results] = await db.query(`SELECT * FROM ${this.modelName}`);
    return results;
  }

  async findById(id) {
    const [result] = await db.query(
      `SELECT * FROM ${this.modelName} WHERE id = ${id}`
    );
    return result;
  }

  async create(newRowObj) {
    const [result] = await db.query(`INSERT INTO ${this.modelName} SET ?`, [
      newRowObj,
    ]);

    return result;
  }

  async deleteById(id) {
    const [result] = await db.query(
      `DELETE FROM ${this.modelName} WHERE id = ?`,
      [id]
    );
    return result;
  }

  async updateById(id, updatedFieldsObj) {
    const [result] = await db.query(
      `UPDATE ${this.modelName} SET ? WHERE id = ?`,
      [updatedFieldsObj, id]
    );
    return result;
  }
}
module.exports = ORM;
