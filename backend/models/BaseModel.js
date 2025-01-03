
class BaseModel {
  constructor(pool, tableName) {
    if (!pool) {
      throw new Error('Database pool is required');
    }
    this.pool = pool;
    this.tableName = tableName;
    this.fields = "*";
    this.sort = "name ASC";
    this.limit = 20;

  }
  filter(obj) {
    console.log(obj);
    // todo: execlude some keys: e.g. sort,fields,limit,...,etc
    let queryObj = { ...obj };
    ['page', 'limit', 'sort', 'fields'].forEach(el => delete queryObj[el]);
    let queryFiltered = JSON.stringify(queryObj);
    queryFiltered = JSON.parse(queryFiltered.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));
    // done: prepare fieldsClause instead of always star
    if (Object.keys(obj.fields).length > 0)
      this.fields = obj.fields.split(",").join(",");
    // todo: prepare a sortClause
    this.sort = obj.sort.split(",")
      .map(item => {
        if (item.startsWith("-")) {
          item = [item.substring(1), "DESC"].join(" ");
        } else {
          item = [item, "ASC"].join(" ");
        }
        return item;

      }).join(", ");
    console.log(this.sort);
    // todo add pagination
    if (Number.isFinite(+obj.limit)) {
      this.limit = +obj.limit
    }

    // Prepare whereClause
    const whereConditions = [];
    for (let [key, value] of Object.entries(queryFiltered)) {
      if (typeof value === 'object' && value !== null) {
        // Handle operators like $gte, $lte, etc.
        for (let [operator, val] of Object.entries(value)) {
          whereConditions.push(`${key} ${operator.replace('$', '')} '${val}'`);
        }
      } else {
        whereConditions.push(`${key} = '${value}'`);
      }
    }
    this.whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : "";


    return this;

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
    const query = `
    SELECT ${this.fields}
    FROM ${this.tableName}
    ${this.whereClause}
    ${this.sort ? `ORDER BY ${this.sort}` : ""}
    ${this.limit ? `LIMIT ${this.limit}` : ""};
    `
    const { rows } = await this.pool.query(query);
    return rows;
  }

  async update(id, updates) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = keys
      .map((key, index) => `"${key}" = $${index + 1} `)
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




module.exports = BaseModel;