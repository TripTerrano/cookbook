const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  // Add other food-specific fields as needed
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
