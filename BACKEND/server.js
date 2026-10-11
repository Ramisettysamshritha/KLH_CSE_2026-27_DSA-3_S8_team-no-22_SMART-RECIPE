const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Recipe Backend is running successfully! 🍳"
  });
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Smart Recipe Backend running on http://localhost:${PORT}`
  );
});