const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 8080;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || "yugabyte",
  password: process.env.DB_PASSWORD || "password",
  database: "orders_db"
});

app.get("/orders", async (req, res) => {
  const result = await pool.query("SELECT id, product_name FROM orders;");
  res.json({ orders: result.rows });
});

app.listen(port, () => console.log(`Order Service running on port ${port}`));
