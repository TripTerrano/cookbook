// Action	Route	HTTP Verb
// Index	/ingredients	GET
// New	/ingredients/new	GET
// Create	/ingredients	POST
// Show	/ingredients/:ingredientId	GET
// Edit	/ingredients/:ingredientId/edit	GET
// Update	/ingredients/:ingredientId	PUT
// Delete	/ingredients/:ingredientId	DELETE

const express = require("express");
const router = express.Router();

const Ingredient = require("../models/ingredient.js");

router.get("/", async (req, res) => {
  const ingredients = await Ingredient.find();
  const sortedIngredients = ingredients.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  res.render("ingredient/index.ejs", { ingredients: sortedIngredients });
});

router.get("/new", (req, res) => {
  res.render("ingredient/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const newIngredient = {
      name: req.body.name,
    };
    const ingredient = await Ingredient.create(newIngredient);
    res.redirect(`/ingredients/${ingredient._id}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:ingredientId", async (req, res) => {
  const ingredientId = req.params.ingredientId;
  const ingredient = await Ingredient.findById(ingredientId);
  if (!ingredient) {
    return res.status(404).send("Ingredient not found");
  }
  res.render("ingredient/show.ejs", { ingredient });
});

router.get("/:ingredientId/edit", async (req, res) => {
  const ingredientId = req.params.ingredientId;
  const ingredient = await Ingredient.findById(ingredientId);
  if (!ingredient) {
    return res.status(404).send("Ingredient not found");
  }
  res.render("ingredient/edit.ejs", { ingredient });
});

router.put("/:ingredientId", async (req, res) => {
  const ingredientId = req.params.ingredientId;
  const updatedIngredient = {
    name: req.body.name,
  };
  await Ingredient.findByIdAndUpdate(ingredientId, updatedIngredient, {
    new: true,
  });
  res.redirect(`/ingredients/${ingredientId}`);
});

router.delete("/:ingredientId", async (req, res) => {
  const ingredientId = req.params.ingredientId;
  await Ingredient.findByIdAndDelete(ingredientId);
  res.redirect("/ingredients");
});

module.exports = router;
