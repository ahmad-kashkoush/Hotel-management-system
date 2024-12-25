const { Pool } = require('pg');
const app = require("./app");
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

// connect to postgress database
pool.connect()
  .then((client) => {
    console.log("✅ Connected to the database successfully!");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.stack);
    process.exit(1); // Exit the server if the database connection fails
  });

app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} Server is running on port ${port}`);
});
