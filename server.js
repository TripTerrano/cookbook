require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const authController = require("./controllers/auth.js");
const recipesController = require("./controllers/recipes.js");
const ingredientsController = require("./controllers/ingredients.js");

const foodController = require("./controllers/food.js");

// Import middleware
const passUserToView = require("./middleware/pass-user-to-view");
const isSignedIn = require("./middleware/is-signed-in");

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-fallback-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Custom middleware
app.use(passUserToView);

// Routes

app.use("/auth", authController);
// app.js
app.use(
  "/users/:userId/food",
  (req, res, next) => {
    // Attach userId to request object
    req.userId = req.params.userId; // Now available in all downstream routes
    next();
  },
  foodController
);
app.use("/recipes", recipesController);
app.use("/ingredients", ingredientsController);

app.get("/", (req, res) => {
  res.render("index");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
