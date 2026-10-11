import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem("smartRecipeFavorites")
      ) || [];

    setFavorites(savedFavorites);
  };

  const removeFavorite = (id) => {
    const updatedFavorites =
      favorites.filter(
        (recipe) =>
          String(recipe.id) !== String(id)
      );

    localStorage.setItem(
      "smartRecipeFavorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  };

  const clearAllFavorites = () => {
    localStorage.removeItem(
      "smartRecipeFavorites"
    );

    setFavorites([]);
  };

  return (
    <div className="favorites-page">

      {/* ================= HERO ================= */}

      <section className="favorites-hero">

        <div>
          <p className="favorites-label">
            YOUR COLLECTION
          </p>

          <h1>
            Recipes you
            <br />
            <span>love.</span>
          </h1>

          <p>
            Keep your favourite recipes in one place
            and come back whenever you're ready to cook.
          </p>
        </div>

        <div className="favorites-count">
          <strong>{favorites.length}</strong>
          <span>Saved Recipes</span>
        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="favorites-content">

        <div className="favorites-heading">

          <div>
            <p className="section-label">
              SAVED RECIPES
            </p>

            <h2>
              Your favourites
            </h2>
          </div>

          {favorites.length > 0 && (
            <button
              className="clear-favorites-button"
              onClick={clearAllFavorites}
            >
              Clear All
            </button>
          )}

        </div>

        {/* ================= EMPTY ================= */}

        {favorites.length === 0 && (
          <div className="favorites-empty">

            <div className="favorites-empty-icon">
              ♡
            </div>

            <h3>
              No favorites yet.
            </h3>

            <p>
              When you find a recipe you love,
              save it here and it'll always be waiting
              for you.
            </p>

            <Link
              to="/recipes"
              className="explore-recipes-button"
            >
              Explore Recipes →
            </Link>

          </div>
        )}

        {/* ================= FAVORITE GRID ================= */}

        {favorites.length > 0 && (
          <div className="favorites-grid">

            {favorites.map((recipe) => (
              <article
                className="favorite-card"
                key={recipe.id}
              >

                <div className="favorite-image">

                  <img
                    src={
                      recipe.image ||
                      FALLBACK_IMAGE
                    }
                    alt={recipe.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        FALLBACK_IMAGE;
                    }}
                  />

                  <span className="favorite-category">
                    {recipe.category ||
                      "RECIPE"}
                  </span>

                  <button
                    className="remove-favorite"
                    onClick={() =>
                      removeFavorite(recipe.id)
                    }
                    title="Remove from favorites"
                  >
                    ♥
                  </button>

                </div>

                <div className="favorite-card-content">

                  <h3>
                    {recipe.name}
                  </h3>

                  <div className="favorite-meta">

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

                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="favorite-view-button"
                  >
                    View Recipe →
                  </Link>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

      {/* ================= CTA ================= */}

      <section className="favorites-cta">

        <div>
          <p className="favorites-cta-label">
            STILL HUNGRY?
          </p>

          <h2>
            Discover something new.
          </h2>

          <p>
            Explore the full recipe collection
            and find your next favourite.
          </p>
        </div>

        <Link
          to="/recipes"
          className="favorites-cta-button"
        >
          Explore Recipes →
        </Link>

      </section>

    </div>
  );
}

export default Favorites;