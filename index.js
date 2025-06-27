const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/todos", require("./routes/todos"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
