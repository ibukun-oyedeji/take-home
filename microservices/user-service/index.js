const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

// PostgreSQL Database Connection
const pool = new Pool({
	user: process.env.DB_USER || "yugabyte",
	host: process.env.DB_HOST || "localhost",
	database: process.env.DB_NAME || "yugabyte",
	password: process.env.DB_PASSWORD || "password",
	port: process.env.DB_PORT || 5433,
});

// Test DB Connection
pool
	.connect()
	.then(() => console.log("Connected to YugaByteDB ✅"))
	.catch((err) => console.error("DB Connection Error ❌", err));

// Routes
app.get("/", (req, res) => {
	res.send("User Service is running 🚀");
});

app.get("/users", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

app.post("/users", async (req, res) => {
	const { name, email } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
			[name, email]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

// Server Listener
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`User Service running on port ${PORT} 🚀`);
});
