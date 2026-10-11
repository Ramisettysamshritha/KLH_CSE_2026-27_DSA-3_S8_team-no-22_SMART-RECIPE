import { useState } from "react";
import { Link } from "react-router-dom";
import "./SmartMatch.css";

function SmartMatch() {
  const [ingredients, setIngredients] = useState([""]);

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searched, setSearched] = useState(false);

  const [error, setError] = useState("");

  /* =========================
     ADD INGREDIENT
  ========================= */

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  /* =========================
     REMOVE INGREDIENT
  ========================= */

  const removeIngredient = (index) => {
    if (ingredients.length === 1) {
      setIngredients([""]);
      return;
    }

    const updatedIngredients = ingredients.filter(
      (_, ingredientIndex) => ingredientIndex !== index
    );

    setIngredients(updatedIngredients);
  };

  /* =========================
     UPDATE INGREDIENT
  ========================= */

  const updateIngredient = (index, value) => {
    const updatedIngredients = [...ingredients];

    updatedIngredients[index] = value;

    setIngredients(updatedIngredients);
  };

  /* =========================
     FIND RECIPES
  ========================= */

  const findRecipes = async () => {
    setError("");
    setSearched(false);

    const cleanedIngredients = ingredients
      .map((ingredient) => ingredient.trim().toLowerCase())
      .filter((ingredient) => ingredient !== "");

    if (cleanedIngredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/recipes/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: cleanedIngredients,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to find recipes."
        );

        setLoading(false);
        return;
      }

      setRecipes(data.recipes || []);

      setSearched(true);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the recipe server. Make sure the backend is running."
      );
    }

    setLoading(false);
  };

  /* =========================
     CLEAR SEARCH
  ========================= */

  const clearSearch = () => {
    setIngredients([""]);
    setRecipes([]);
    setSearched(false);
    setError("");
  };

  return (
    <div className="smart-match-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="smart-match-hero">

        <div className="smart-match-hero-content">

          <p className="smart-match-label">
            SMART INGREDIENT MATCHING
          </p>

          <h1>
            Tell us what you have.
            <br />
            <span>We'll find what you can cook.</span>
          </h1>

          <p>
            Add as many ingredients as you want.
            Our matching system compares them with
            available recipes and ranks your best options.
          </p>

        </div>

      </section>


      {/* =========================
          INGREDIENT INPUT
      ========================= */}

      <section className="ingredient-section">

        <div className="ingredient-container">

          <div className="ingredient-header">

            <div>

              <p className="section-label">
                STEP 01
              </p>

              <h2>
                What's in your kitchen?
              </h2>

              <p>
                Add every ingredient you have available.
              </p>

            </div>

            <div className="ingredient-count">
              {ingredients.filter(
                (ingredient) =>
                  ingredient.trim() !== ""
              ).length}{" "}
              ingredients
            </div>

          </div>


          {/* INPUTS */}

          <div className="ingredients-list">

            {ingredients.map((ingredient, index) => (

              <div
                className="ingredient-input-row"
                key={index}
              >

                <span className="ingredient-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    updateIngredient(
                      index,
                      e.target.value
                    )
                  }
                  placeholder={
                    index === 0
                      ? "Enter an ingredient..."
                      : "Add another ingredient..."
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      ingredient.trim() !== ""
                    ) {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                />

                <button
                  type="button"
                  className="remove-ingredient"
                  onClick={() =>
                    removeIngredient(index)
                  }
                  aria-label="Remove ingredient"
                >
                  ×
                </button>

              </div>

            ))}

          </div>


          {/* ACTIONS */}

          <div className="ingredient-actions">

            <button
              type="button"
              className="add-ingredient-button"
              onClick={addIngredient}
            >
              + Add another ingredient
            </button>

            <button
              type="button"
              className="find-recipes-button"
              onClick={findRecipes}
              disabled={loading}
            >
              {loading
                ? "Finding Recipes..."
                : "Find My Recipes →"}
            </button>

          </div>


          {/* ERROR */}

          {error && (
            <div className="match-error">
              {error}
            </div>
          )}

        </div>

      </section>


      {/* =========================
          RESULTS
      ========================= */}

      {searched && (

        <section className="results-section">

          <div className="results-container">

            <div className="results-header">

              <div>

                <p className="section-label">
                  STEP 02
                </p>

                <h2>
                  Your recipe matches
                </h2>

                <p>
                  Ranked by how closely your ingredients
                  match each recipe.
                </p>

              </div>

              <button
                className="clear-button"
                onClick={clearSearch}
              >
                Start Over
              </button>

            </div>


            {recipes.length === 0 ? (

              <div className="no-results">

                <div className="no-results-icon">
                  🍳
                </div>

                <h3>
                  No matching recipes found.
                </h3>

                <p>
                  Try adding different ingredients
                  or check your spelling.
                </p>

              </div>

            ) : (

              <div className="results-list">

                {recipes.map((recipe, index) => (

                  <div
                    className="match-recipe-card"
                    key={recipe.id}
                  >

                    {/* RANK */}

                    <div className="recipe-rank">
                      #{index + 1}
                    </div>


                    {/* MAIN INFO */}

                    <div className="match-recipe-main">

                      <div className="match-recipe-heading">

                        <div>

                          <span className="recipe-category">
                            {recipe.category}
                          </span>

                          <h3>
                            {recipe.name}
                          </h3>

                        </div>

                        <div className="match-percentage">

                          <strong>
                            {recipe.matchPercentage}%
                          </strong>

                          <span>
                            match
                          </span>

                        </div>

                      </div>


                      {/* PROGRESS BAR */}

                      <div className="match-progress">

                        <div
                          className="match-progress-fill"
                          style={{
                            width: `${recipe.matchPercentage}%`,
                          }}
                        />

                      </div>


                      {/* META */}

                      <div className="recipe-meta">

                        <span>
                          ⏱ {recipe.cookingTime}
                        </span>

                        <span>
                          ◆ {recipe.difficulty}
                        </span>

                      </div>


                      {/* MATCHED */}

                      <div className="ingredient-result-group">

                        <h4>
                          You have
                        </h4>

                        <div className="ingredient-tags">

                          {recipe.matchedIngredients.map(
                            (ingredient) => (
                              <span
                                className="matched-tag"
                                key={ingredient}
                              >
                                ✓ {ingredient}
                              </span>
                            )
                          )}

                        </div>

                      </div>


                      {/* MISSING */}

                      {recipe.missingIngredients.length >
                        0 && (

                        <div className="ingredient-result-group">

                          <h4>
                            You need
                          </h4>

                          <div className="ingredient-tags">

                            {recipe.missingIngredients.map(
                              (ingredient) => (
                                <span
                                  className="missing-tag"
                                  key={ingredient}
                                >
                                  + {ingredient}
                                </span>
                              )
                            )}

                          </div>

                        </div>

                      )}

                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="view-recipe-button"
                      >
                        View Recipe →
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      )}


      {/* =========================
          HOW MATCHING WORKS
      ========================= */}

      {!searched && (

        <section className="matching-info">

          <div className="matching-info-container">

            <div>

              <p className="section-label">
                HOW IT WORKS
              </p>

              <h2>
                Your ingredients become
                <br />
                the search algorithm.
              </h2>

            </div>


            <div className="matching-points">

              <div>

                <span>01</span>

                <div>
                  <h3>
                    Normalize
                  </h3>

                  <p>
                    Ingredients are converted to a
                    consistent format before matching.
                  </p>
                </div>

              </div>


              <div>

                <span>02</span>

                <div>
                  <h3>
                    Compare
                  </h3>

                  <p>
                    Your ingredients are compared against
                    every recipe ingredient.
                  </p>
                </div>

              </div>


              <div>

                <span>03</span>

                <div>
                  <h3>
                    Rank
                  </h3>

                  <p>
                    Recipes are sorted from the highest
                    match percentage to the lowest.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

      )}

    </div>
  );
}

export default SmartMatch;