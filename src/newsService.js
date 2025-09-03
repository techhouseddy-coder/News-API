const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config(); // <-- add this line

const cache = new NodeCache({ stdTTL: 300 });
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

async function fetchFromAPI(endpoint, params) {
  const cacheKey = JSON.stringify({ endpoint, params });
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { ...params, token: API_KEY },
    });

    cache.set(cacheKey, response.data);
    return response.data;
  } catch (err) {
    console.error("❌ GNews API Error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.errors?.[0] || "Failed to fetch from GNews API"
    );
  }
}

async function getNews(limit = 10) {
  return await fetchFromAPI("/top-headlines", { lang: "en", max: limit });
}

async function searchByKeyword(keyword) {
  return await fetchFromAPI("/search", { q: keyword, lang: "en" });
}

async function findByTitle(title) {
  const data = await searchByKeyword(title);
  return data.articles.filter(article =>
    article.title.toLowerCase().includes(title.toLowerCase())
  );
}

async function findByAuthor(author) {
  const data = await getNews(50);
  return data.articles.filter(article =>
    article.source.name.toLowerCase().includes(author.toLowerCase())
  );
}

module.exports = { getNews, searchByKeyword, findByTitle, findByAuthor };
