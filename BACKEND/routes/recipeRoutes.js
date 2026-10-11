const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Load recipes from JSON file
const recipesPath = path.join(__dirname, "../data/recipes.json");

const getRecipes = () => {
  const data = fs.readFileSync(recipesPath, "utf-8");
  return JSON.parse(data);
};

// GET all recipes
router.get("/", (req, res) => {
  try {
    const recipes = getRecipes();

    res.json({
      success: true,
      count: recipes.length,
      recipes: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load recipes"
    });
  }
});

// SMART INGREDIENT MATCHING
router.post("/match", (req, res) => {
  try {
    const { ingredients } = req.body;

    // Check whether ingredients were provided
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one ingredient."
      });
    }

    // Clean and normalize user ingredients
    const userIngredients = ingredients
      .map((ingredient) => ingredient.toLowerCase().trim())
      .filter((ingredient) => ingredient.length > 0);

    const recipes = getRecipes();

    const results = recipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingredient) =>
        ingredient.toLowerCase().trim()
      );

      // Find matching ingredients
      const matchedIngredients = recipeIngredients.filter((ingredient) =>
        userIngredients.includes(ingredient)
      );

      // Find ingredients user does not have
      const missingIngredients = recipeIngredients.filter(
        (ingredient) => !userIngredients.includes(ingredient)
      );

      // Calculate match percentage
      const matchPercentage = Math.round(
        (matchedIngredients.length / recipeIngredients.length) * 100
      );

      return {
        ...recipe,
        matchedIngredients,
        missingIngredients,
        matchPercentage
      };
    });

    // Sort recipes from highest match to lowest match
    results.sort((a, b) => {
      return b.matchPercentage - a.matchPercentage;
    });

    // Only return recipes with at least one matching ingredient
    const matchingRecipes = results.filter(
      (recipe) => recipe.matchedIngredients.length > 0
    );

    res.json({
      success: true,
      userIngredients,
      totalResults: matchingRecipes.length,
      recipes: matchingRecipes
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while matching recipes."
    });
  }
});

module.exports = router;