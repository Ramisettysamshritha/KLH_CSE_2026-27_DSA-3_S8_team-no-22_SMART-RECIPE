import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./RecipeDetails.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=85";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/recipes"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load recipes."
          );
        }

        const foundRecipe = data.recipes.find(
          (item) => String(item.id) === String(id)
        );

        if (!foundRecipe) {
          setError("Recipe not found.");
          return;
        }

        setRecipe(foundRecipe);

        const savedFavorites =
          JSON.parse(
            localStorage.getItem(
              "smartRecipeFavorites"
            )
          ) || [];

        const alreadyFavorite =
          savedFavorites.some(
            (item) =>
              String(item.id) === String(foundRecipe.id)
          );

        setIsFavorite(alreadyFavorite);

      } catch (error) {
        console.error(error);

        setError(
          "Unable to load this recipe. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  const toggleFavorite = () => {
    if (!recipe) return;

    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "smartRecipeFavorites"
        )
      ) || [];

    if (isFavorite) {
      const updatedFavorites =
        savedFavorites.filter(
          (item) =>
            String(item.id) !== String(recipe.id)
        );

      localStorage.setItem(
        "smartRecipeFavorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const updatedFavorites = [
        ...savedFavorites,
        recipe,
      ];

      localStorage.setItem(
        "smartRecipeFavorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-message">
          <div className="recipe-loading-circle" />
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-message">
          <div className="recipe-error-icon">
            🍽️
          </div>

          <h2>
            {error || "Recipe not found."}
          </h2>

          <p>
            We couldn't find the recipe you're
            looking for.
          </p>

          <Link
            to="/recipes"
            className="back-recipes-button"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">

      {/* ================= TOP ================= */}

      <section className="recipe-details-top">

        <Link
          to="/recipes"
          className="recipe-back-link"
        >
          ← Back to Recipes
        </Link>

        <div className="recipe-details-grid">

          {/* IMAGE */}

          <div className="recipe-details-image">

            <img
              src={recipe.image || FALLBACK_IMAGE}
              alt={recipe.name}
              onError={(e) => {
                e.currentTarget.src =
                  FALLBACK_IMAGE;
              }}
            />

            <span className="details-category">
              {recipe.category || "RECIPE"}
            </span>

          </div>

          {/* INFO */}

          <div className="recipe-details-info">

            <p className="details-label">
              RECIPE
            </p>

            <h1>{recipe.name}</h1>

            <p className="details-description">
              A delicious {recipe.name.toLowerCase()}
              made with simple ingredients. Check
              what you already have, follow the steps,
              and enjoy your meal.
            </p>

            <div className="details-meta">

              <div>
                <span>TIME</span>
                <strong>
                  {recipe.cookingTime || "—"}
                </strong>
              </div>

              <div>
                <span>DIFFICULTY</span>
                <strong>
                  {recipe.difficulty || "Easy"}
                </strong>
              </div>

              <div>
                <span>CATEGORY</span>
                <strong>
                  {recipe.category || "Recipe"}
                </strong>
              </div>

            </div>

            <button
              className={
                isFavorite
                  ? "favorite-button saved"
                  : "favorite-button"
              }
              onClick={toggleFavorite}
            >
              {isFavorite
                ? "♥ Saved to Favorites"
                : "♡ Add to Favorites"}
            </button>

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="recipe-details-content">

        {/* INGREDIENTS */}

        <div className="ingredients-section">

          <div className="details-section-heading">
            <p className="details-section-label">
              WHAT YOU NEED
            </p>

            <h2>Ingredients</h2>
          </div>

          <div className="ingredients-list">

            {Array.isArray(recipe.ingredients) &&
              recipe.ingredients.map(
                (ingredient, index) => (
                  <div
                    className="ingredient-item"
                    key={`${ingredient}-${index}`}
                  >
                    <span className="ingredient-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span>
                      {ingredient}
                    </span>
                  </div>
                )
              )}

          </div>

        </div>

        {/* INSTRUCTIONS */}

        <div className="instructions-section">

          <div className="details-section-heading">
            <p className="details-section-label">
              LET'S COOK
            </p>

            <h2>Instructions</h2>
          </div>

          <div className="instructions-list">

            {Array.isArray(recipe.instructions) &&
              recipe.instructions.map(
                (step, index) => (
                  <div
                    className="instruction-item"
                    key={`${step}-${index}`}
                  >
                    <div className="instruction-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div>
                      <h3>
                        Step {index + 1}
                      </h3>

                      <p>{step}</p>
                    </div>
                  </div>
                )
              )}

          </div>

        </div>

      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="recipe-details-cta">

        <div>
          <p className="details-section-label">
            ENJOY YOUR MEAL
          </p>

          <h2>
            Ready to start cooking?
          </h2>

          <p>
            You already have the recipe.
            Now make it yours.
          </p>
        </div>

        <Link
          to="/smart-match"
          className="details-cta-button"
        >
          Find More Recipes →
        </Link>

      </section>

    </div>
  );
}

export default RecipeDetails;