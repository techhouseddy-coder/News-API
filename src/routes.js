const express = require("express");
const { getNews, searchByKeyword, findByTitle, findByAuthor } = require("./newsService");

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const news = await getNews(limit || 10);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: "Keyword required" });
  const data = await searchByKeyword(keyword);
  res.json(data);
});

router.get("/title", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Title required" });
  const data = await findByTitle(title);
  res.json(data);
});

router.get("/author", async (req, res) => {
  const { author } = req.query;
  if (!author) return res.status(400).json({ error: "Author required" });
  const data = await findByAuthor(author);
  res.json(data);
});

module.exports = router;
