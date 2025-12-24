const express = require("express");
const cors = require("cors");
const db = require("./queries");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ info: "FavLinks API running" });
});

app.get("/links", db.getLinks);
app.post("/links", db.createLink);
app.put("/links/:id", db.updateLink);
app.delete("/links/:id", db.deleteLink);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
