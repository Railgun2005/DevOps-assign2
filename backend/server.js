const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/fullstackdb";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

app.get("/api", (req, res) => {
  res.json({
    message: "Node.js backend is working!"
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});