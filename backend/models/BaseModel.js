
class BaseModel {
  constructor(pool, tableName) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`);
    
    const query = `
      INSERT INTO ${this.tableName} ("${keys.join('", "')}")
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }

  async findById(id) {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async findAll() {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} ORDER BY created_at DESC`
    );
    return rows;
  }

  async update(id, updates) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    
    const setClause = keys
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(', ');
    
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    
    const { rows } = await this.pool.query(query, [...values, id]);
    return rows[0] || null;
  }

  async delete(id) {
    const { rowCount } = await this.pool.query(
      `DELETE FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return rowCount > 0;
  }
}




module.exports=BaseModel;