const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");
const Ingredient = require("../models/ingredient.js");

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("owner")
      .populate("ingredients");
    res.render("recipe/index.ejs", { recipes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/new", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    const sortedIngredients = ingredients.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.render("recipe/new.ejs", { ingredients: sortedIngredients });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, instructions, ingredients } = req.body;
    const newRecipe = {
      name,
      instructions,
      owner: req.session.user._id,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
    };

    const recipe = await Recipe.create(newRecipe);
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate("owner")
      .populate("ingredients");

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    const allIngredients = await Ingredient.find();
    res.render("recipe/show.ejs", {
      recipe,
      availableIngredients: allIngredients,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:recipeId/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate(
      "ingredients"
    );

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    const allIngredients = await Ingredient.find();
    const sortedIngredients = allIngredients.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    res.render("recipe/edit.ejs", {
      recipe,
      availableIngredients: sortedIngredients,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:recipeId", async (req, res) => {
  try {
    const { name, instructions, ingredients } = req.body;
    const updatedRecipe = {
      name,
      instructions,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
    };

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      updatedRecipe,
      { new: true }
    ).populate("ingredients");

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:recipeId/ingredients", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      { $addToSet: { ingredients: req.body.ingredientId } },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:recipeId/ingredients/:ingredientId", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      { $pull: { ingredients: req.params.ingredientId } },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.redirect(`/recipes/${recipe._id}/edit`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.redirect("/recipes");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
