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
// ... ရှေ့ပိုင်း Code တွေ ...
const axios = require('axios'); // axios ကို သုံးဖို့ ထည့်

// ဒါက ဘာသာပြန်မယ့် Function
async function translateToBurmese(text) {
  // ဒီနေရာမှာ ဘာသာပြန်တဲ့ API ကို ခေါ်သုံးရမယ်။
  // ဥပမာ - MyAnimeGPT (မြန်မာ AI) ကို သုံးလို့ရတယ်။
  // ဒါက နမူနာ Code ပဲ။ တကယ့် API အတိုင်း ပြင်ရမယ်။
  try {
    // ဒီ API လိပ်စာက ဥပမာသာဖြစ်တယ်။ တကယ့် API လိပ်စာ ထည့်ရမယ်။
    const response = await axios.post('https://api.myanimegpt.com/translate', { 
      text: text,
      target_lang: 'my'
    });
    return response.data.translated_text; 
  } catch (error) {
    console.error("ဘာသာပြန်ရာမှာ အဆင်မပြေဘူး:", error);
    return text; // အဆင်မပြေရင် မူရင်းစာသားအတိုင်း ပြန်ပို့
  }
}

// သတင်းတွေ ရှာပြီး ပြန်တဲ့ Function ကို ပြင်မယ်
async function fetchNews() {
    // ... သတင်းတွေ ရှာတဲ့ Code ...
    const articles = response.data.articles; 
    const translatedArticles = [];

    for (let article of articles) {
        const translatedTitle = await translateToBurmese(article.title);
        const translatedDescription = await translateToBurmese(article.description || '');
        
        translatedArticles.push({
            title: translatedTitle,
            description: translatedDescription,
            // ... တခြား အချက်အလက်တွေ ...
        });
    }
    
    return translatedArticles;
}

// ... ကျန်တဲ့ Code တွေ ...
