
const { pool } = require('../server');
const { BaseModel } = require('./BaseModel');

class SettingsModel extends BaseModel {
    constructor(pool) {
        super(pool, 'settings');
    }

    async getSettings() {
        const { rows } = await this.pool.query('SELECT * FROM settings ORDER BY created_at DESC LIMIT 1');
        return rows[0] || null;
    }

    async updateSettings(updates) {
        const keys = Object.keys(updates);
        const values = Object.values(updates);

        const setClause = keys
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(', ');

        const query = `
      UPDATE settings 
      SET ${setClause}
      WHERE id = (SELECT id FROM settings ORDER BY created_at DESC LIMIT 1)
      RETURNING *
    `;

        const { rows } = await this.pool.query(query, values);
        return rows[0];
    }
}
const Settings = new SettingsModel(pool);
module.exports = Settings;