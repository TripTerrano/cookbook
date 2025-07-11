// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  const userId = req.userId; // Assuming userId is set in middleware
  const user = await User.findById(userId);
  console.log("User ID:", userId);
  console.log("User:", user);
  res.render("food/index.ejs", {
    pantry: user.pantry || [],
    userId,
  });
});
router.get("/new", (req, res) => {
  res.render("food/new.ejs");
});
// foodController.js
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send("User not found");

    // Create new food item from request body
    const newFoodItem = {
      name: req.body.name,
    };

    // Add to pantry and save
    user.pantry.push(newFoodItem);
    await user.save();

    res.redirect(`/users/${user._id}/food`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
