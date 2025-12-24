const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const getLinks = (req, res) => {
  pool.query("SELECT * FROM links ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results.rows);
  });
};

const createLink = (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }

  pool.query(
    "INSERT INTO links (title, url) VALUES ($1, $2) RETURNING *",
    [title, url],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(results.rows[0]);
    }
  );
};

const updateLink = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, url } = req.body;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }

  pool.query(
    "UPDATE links SET title = $1, url = $2 WHERE id = $3 RETURNING *",
    [title, url, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.rows.length === 0) return res.status(404).json({ error: "Link not found" });
      res.status(200).json(results.rows[0]);
    }
  );
};

const deleteLink = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  pool.query("DELETE FROM links WHERE id = $1 RETURNING *", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.rows.length === 0) return res.status(404).json({ error: "Link not found" });
    res.status(200).json({ deleted: results.rows[0] });
  });
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};
