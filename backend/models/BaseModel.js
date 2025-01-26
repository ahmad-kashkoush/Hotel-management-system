const AppError = require("../AppError");

class BaseModel {
  constructor(pool, tableName) {
    if (!pool) {
      throw new Error('Database pool is required');
    }
    this.pool = pool;
    this.tableName = tableName;
    this.fields = "*";
    this.sort = "";
    this.limit = -1;
    this.page = 1;

  }
  filter(obj) {
    if (Object.keys(obj).length < 1)
      return this;
    // done: execlude some keys: e.g. sort,fields,limit,...,etc
    let queryObj = { ...obj };
    ['page', 'limit', 'sort', 'fields'].forEach(el => delete queryObj[el]);
    let queryFiltered = JSON.stringify(queryObj);
    // For example, if obj is { created_at__

    // done: prepare fieldsClause instead of always star
    if (obj.fields && Object.keys(obj.fields).length > 0)
      this.fields = obj.fields.split(",").join(",");
    // done: prepare a sortClause
    if (obj.sort) {
      this.sort = obj.sort.split(",")
        .map(item => {
          if (item.startsWith("-")) {
            item = [item.substring(1), "DESC"].join(" ");
          } else {
            item = [item, "ASC"].join(" ");
          }
          return item;

        }).join(", ");
    }

    if (Number.isFinite(+obj.limit)) {
      this.limit = +obj.limit
    }
    if (Number.isFinite(+obj.page)) {
      this.page = +obj.page;
    }

    // Prepare whereClause
    this.buildWhereClause(queryFiltered);


    return this;

  }

  buildWhereClause(queryObject) {
    const operatorsMap = {
      gt: '>',
      lt: '<',
      gte: '>=',
      lte: '<=',
      eq: '=', // Explicit equality
      neq: '!=', // Explicit inequality
    };

    const whereConditions = [];
    for (const [key, value] of Object.entries(JSON.parse(queryObject))) {
      const match = key.match(/(\w+)__(gt|lt|gte|lte|eq|neq)$/);// capture field, operator
      if (match) {
        // Extract the field, operator, and value
        const [, field, operator] = match;
        const sqlOperator = operatorsMap[operator];
        const formattedValue =
          field.includes('created_at') || field.includes('date')
            ? `TO_DATE('${value}', 'YYYY-MM-DD')`
            : isNaN(value) ? `'${value}'` : value;

        whereConditions.push(`${field} ${sqlOperator} ${formattedValue}`);
      } else {
        // Default to equality if no operator is provided
        const formattedValue =
          key.includes('created_at') || key.includes('date')
            ? `TO_DATE('${value}', 'YYYY-MM-DD')`
            : isNaN(value) ? `'${value}'` : value;

        whereConditions.push(`${key} = ${formattedValue}`);
      }
    }

    this.whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

  };



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
      `SELECT ${this.fields ? this.fields : "*"} FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async findAll() {
    // validate limit and page
    // construct initial query
    // if not limit, then no pagination, then fetch all
    // otherwise, then pagination
    // 1) fetch count
    // 2) validate pagination
    // 3) paginated query
    // 4) return details about pagination also
    // todo: refactor this method to include paginated query in https://chatgpt.com/share/67791ca9-37b8-8007-8780-ef22ec5965bf







    const query = `
    SELECT ${this.fields}
    FROM ${this.tableName}
    ${this.whereClause}
    ${this.sort ? `ORDER BY ${this.sort}` : ""}
    `
    // ${this.limit > 0 ? `LIMIT ${this.limit}` : ""};


    const { rows } = await this.pool.query(query);
    // todo: add pagincation
    let numberOfPages = -1;
    let start = 0;
    let end = rows.length;
    if (this.limit > 0 && rows.length > this.limit) {
      numberOfPages = Math.ceil(rows.length / this.limit);
      if (this.page > numberOfPages || this.page < 1) {
        throw new AppError("page is not in range");
      }
      // range will be [start, end)
      start = (this.page - 1) * this.limit;
      end = Math.min(start + this.limit, rows.length);
    }
    return rows.slice(start, end);
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

  async executeRowQuery(query) {
    return await this.pool.query(query);
  }
}




module.exports = BaseModel;