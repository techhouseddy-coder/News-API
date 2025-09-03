# News API Proxy with Express.js

This project is a simple Express.js server that fetches news data from the [GNews API](https://gnews.io/) with caching, search, and filter functionality.

## 🚀 Features
- Fetch top headlines
- Search by keyword
- Filter by title
- Filter by author
- Response caching with `node-cache`

---

## 📂 Project Structure
```
project-root/
│── server.js            # Main entry point
│── routes/
│    └── newsRoutes.js   # API route definitions
│── services/
│    └── newsService.js  # Handles API requests and caching
│── .env                 # Environment variables (API key)
│── package.json         # Dependencies and scripts
│── README.md            # Documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/news-api-proxy.git
cd news-api-proxy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get your API key
- Visit [GNews API](https://gnews.io/)
- Sign up and get your **API key**

### 4. Create a `.env` file in project root
```env
API_KEY=your_gnews_api_key_here
PORT=5000
```

### 5. Run the server
```bash
npm start
```

Server will run at:
```
http://localhost:5000
```

---

## 📡 API Endpoints

### 1. Get Top News
```http
GET http://localhost:5000/api/news?limit=5
```
**Response Example:**
```json
{
  "totalArticles": 5,
  "articles": [
    {
      "title": "Sample News",
      "description": "News description...",
      "url": "https://example.com/news",
      "source": { "name": "BBC" }
    }
  ]
}
```

### 2. Search by Keyword
```http
GET http://localhost:5000/api/news/search?keyword=bitcoin
```

### 3. Find by Title
```http
GET http://localhost:5000/api/news/title?title=election
```

### 4. Find by Author
```http
GET http://localhost:5000/api/news/author?author=bbc
```

---

## 🛠 Dependencies
- express
- axios
- node-cache
- dotenv

---

## 📌 Notes
- Free GNews API key has **100 requests/day limit**.
- Cached responses last **5 minutes (300s)**.

---

## 👨‍💻 Author
Your Name - [GitHub Profile](https://github.com/your-username)
