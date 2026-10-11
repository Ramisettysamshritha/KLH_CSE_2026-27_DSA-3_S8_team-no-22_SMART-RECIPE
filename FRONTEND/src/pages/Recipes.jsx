import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Recipes.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(9);

  /*
    =========================================
    LOAD RECIPES FROM BACKEND
    =========================================
  */

  useEffect(() => {
    const loadRecipes = async () => {
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

        setRecipes(
          Array.isArray(data.recipes)
            ? data.recipes
            : []
        );
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load recipes. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  /*
    =========================================
    RESET LOAD MORE WHEN FILTER CHANGES
    =========================================
  */

  useEffect(() => {
    setVisibleCount(9);
  }, [search, category, sortBy]);

  /*
    =========================================
    CREATE CATEGORIES AUTOMATICALLY

    We do NOT hardcode categories.
    New categories added to recipes.json
    automatically appear here.
    =========================================
  */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        recipes
          .map((recipe) => recipe.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [recipes]);

  /*
    =========================================
    SEARCH + FILTER + SORT
    =========================================
  */

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    /*
      SEARCH

      Searches:
      - recipe name
      - category
      - ingredients
    */

    if (search.trim() !== "") {
      const searchTerm = search
        .toLowerCase()
        .trim();

      result = result.filter((recipe) => {
        const recipeName =
          recipe.name?.toLowerCase() || "";

        const recipeCategory =
          recipe.category?.toLowerCase() || "";

        const ingredients =
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients
                .join(" ")
                .toLowerCase()
            : "";

        return (
          recipeName.includes(searchTerm) ||
          recipeCategory.includes(searchTerm) ||
          ingredients.includes(searchTerm)
        );
      });
    }

    /*
      CATEGORY FILTER
    */

    if (category !== "All") {
      result = result.filter(
        (recipe) =>
          recipe.category === category
      );
    }

    /*
      SORT BY NAME
    */

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
      );
    }

    /*
      SORT BY COOKING TIME
    */

    if (sortBy === "time") {
      result.sort((a, b) => {
        const timeA =
          Number.parseInt(
            a.cookingTime,
            10
          ) || 999;

        const timeB =
          Number.parseInt(
            b.cookingTime,
            10
          ) || 999;

        return timeA - timeB;
      });
    }

    /*
      SORT BY DIFFICULTY
    */

    if (sortBy === "difficulty") {
      const difficultyOrder = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
      };

      result.sort((a, b) => {
        const difficultyA =
          difficultyOrder[a.difficulty] || 99;

        const difficultyB =
          difficultyOrder[b.difficulty] || 99;

        return difficultyA - difficultyB;
      });
    }

    return result;
  }, [
    recipes,
    search,
    category,
    sortBy,
  ]);

  /*
    =========================================
    ONLY SHOW A FEW AT FIRST
    =========================================
  */

  const visibleRecipes =
    filteredRecipes.slice(
      0,
      visibleCount
    );

  /*
    =========================================
    LOAD MORE
    =========================================
  */

  const loadMore = () => {
    setVisibleCount(
      (previousCount) =>
        previousCount + 9
    );
  };

  /*
    =========================================
    CLEAR FILTERS
    =========================================
  */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  };

  /*
    =========================================
    LOADING SCREEN
    =========================================
  */

  if (loading) {
    return (
      <div className="recipes-page">
        <div className="recipes-message">
          <div className="loading-circle" />

          <p>
            Loading delicious recipes...
          </p>
        </div>
      </div>
    );
  }

  /*
    =========================================
    MAIN PAGE
    =========================================
  */

  return (
    <div className="recipes-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="recipes-hero">

        <div className="recipes-hero-content">

          <p className="recipes-label">
            RECIPE COLLECTION
          </p>

          <h1>
            Something delicious
            <br />
            is waiting.
          </h1>

          <p>
            Explore recipes, discover new flavours,
            and find something perfect for your
            kitchen today.
          </p>

        </div>

        <div className="recipes-count">

          <strong>
            {recipes.length}
          </strong>

          <span>
            Recipes
          </span>

        </div>

      </section>


      {/* =====================================
          RECIPE EXPLORER
      ===================================== */}

      <section className="recipe-explorer">

        {/* TOP */}

        <div className="explorer-top">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Find your next meal
            </h2>

          </div>

          <p className="result-count">

            Showing{" "}

            <strong>
              {filteredRecipes.length}
            </strong>{" "}

            recipes

          </p>

        </div>


        {/* ===================================
            SEARCH + SORT
        =================================== */}

        <div className="recipe-controls">

          <div className="recipe-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="default">
              Sort by
            </option>

            <option value="name">
              Name A–Z
            </option>

            <option value="time">
              Quickest first
            </option>

            <option value="difficulty">
              Easiest first
            </option>

          </select>

        </div>


        {/* ===================================
            CATEGORY FILTERS
        =================================== */}

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        {/* ===================================
            ERROR
        =================================== */}

        {error && (

          <div className="recipes-message error">

            <h3>
              Something went wrong.
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ===================================
            NO RESULTS
        =================================== */}

        {!error &&
          filteredRecipes.length === 0 && (

            <div className="recipes-message">

              <div className="empty-icon">
                🍽️
              </div>

              <h3>
                No recipes found.
              </h3>

              <p>
                Try another recipe,
                ingredient, or category.
              </p>

              <button
                className="clear-filter-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}


        {/* ===================================
            RECIPE GRID
        =================================== */}

        {!error &&
          visibleRecipes.length > 0 && (

            <div className="recipes-grid">

              {visibleRecipes.map(
                (recipe, index) => (

                  <article
                    className="recipe-card"
                    key={
                      recipe.id ??
                      `${recipe.name}-${index}`
                    }
                  >

                    {/* IMAGE */}

                    <div className="recipe-image">

                      <img
                        src={
                          recipe.image ||
                          FALLBACK_IMAGE
                        }
                        alt={recipe.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            FALLBACK_IMAGE;
                        }}
                      />

                      <span className="recipe-category-badge">

                        {recipe.category ||
                          "RECIPE"}

                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="recipe-card-content">

                      <h3>
                        {recipe.name}
                      </h3>


                      {/* META */}

                      <div className="recipe-card-meta">

                        <span>
                          ⏱{" "}
                          {recipe.cookingTime ||
                            "—"}
                        </span>

                        <span>
                          ◆{" "}
                          {recipe.difficulty ||
                            "Easy"}
                        </span>

                      </div>


                      {/* INGREDIENTS */}

                      <div className="recipe-ingredient-preview">

                        {Array.isArray(
                          recipe.ingredients
                        ) &&
                          recipe.ingredients
                            .slice(0, 4)
                            .map(
                              (
                                ingredient
                              ) => (

                                <span
                                  key={
                                    ingredient
                                  }
                                >
                                  {ingredient}
                                </span>

                              )
                            )}

                        {Array.isArray(
                          recipe.ingredients
                        ) &&
                          recipe.ingredients
                            .length > 4 && (

                            <span>

                              +
                              {recipe.ingredients
                                .length - 4}

                            </span>

                          )}

                      </div>


                      {/* VIEW RECIPE */}

                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="recipe-view-button"
                      >
                        View Recipe →
                      </Link>

                    </div>

                  </article>

                )
              )}

            </div>

          )}


        {/* ===================================
            LOAD MORE
        =================================== */}

        {!error &&
          visibleCount <
            filteredRecipes.length && (

            <div className="load-more-section">

              <button
                className="load-more-button"
                onClick={loadMore}
              >

                Load More Recipes

                <span>
                  ↓
                </span>

              </button>

              <p>
                Showing{" "}
                {visibleRecipes.length}{" "}
                of{" "}
                {filteredRecipes.length}{" "}
                recipes
              </p>

            </div>

          )}


        {/* ===================================
            END OF COLLECTION
        =================================== */}

        {!error &&
          filteredRecipes.length > 0 &&
          visibleCount >=
            filteredRecipes.length && (

            <div className="all-recipes-loaded">

              <span>
                ✓
              </span>

              <p>
                You've reached the end of
                this collection.
              </p>

            </div>

          )}

      </section>

    </div>
  );
}

export default Recipes;