const express = require("express");
const { connectDB } = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Healthcare Backend Running Successfully ✅");
});

const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL
connectDB();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
