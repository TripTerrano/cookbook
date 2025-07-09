// server.js

const authController = require("./controllers/auth.js");
const recipesController = require("./controllers/recipes.js");
const ingredientsController = require("./controllers/ingredients.js");

// server.js

// below middleware
app.use("/auth", authController);
app.use("/recipes", recipesController);
app.use("/ingredients", ingredientsController);
