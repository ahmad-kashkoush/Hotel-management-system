const { Pool } = require('pg');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3000;

// Set up PostgreSQL client
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
exports.pool = pool;
// connect to postgress database
const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to the database successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.stack);
    process.exit(1); // Exit the server if the database connection fails
  }
}

const startServer = async () => {
  await initializeDatabase();
  const app = require("./app");  // this way I've avoided circular dependancy
  app.listen(port, () => {
    console.log(`${process.env.NODE_ENV} Server is running on port ${port}`);
  });
};

startServer();
