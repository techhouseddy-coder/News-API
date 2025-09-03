const express = require("express");
const dotenv = require("dotenv");
const newsRoutes = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/news", newsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("🔑 API_KEY loaded:", process.env.API_KEY ? "Yes" : "No");
});
