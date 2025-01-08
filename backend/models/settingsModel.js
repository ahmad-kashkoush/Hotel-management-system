
const  BaseModel  = require('./BaseModel');

class SettingsModel extends BaseModel {
    constructor(pool) {
        super(pool, 'settings');
    }

    async getSettings() {
        const { rows } = await this.pool.query('SELECT * FROM settings ORDER BY created_at DESC LIMIT 1');
        return rows[0] || null;
    }

    /**
     * Updates the latest settings stored in the database with the given updates.
     * @param {Object} updates - Object with key-value pairs of the settings to update.
     * @returns {Promise<Object>} - The updated settings object.
     */
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

module.exports = SettingsModel;