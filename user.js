const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 8000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || "yugabyte",
  password: process.env.DB_PASSWORD || "password",
  database: "users_db"
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT id, name FROM users;");
  res.json({ users: result.rows });
});

app.listen(port, () => console.log(`User Service running on port ${port}`));
