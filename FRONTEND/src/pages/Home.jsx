import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="hero-content">

          <p className="hero-label">
            SMART RECIPE
          </p>

          <h1>
            What do you have
            <br />
            in your <span>kitchen?</span>
          </h1>

          <p className="hero-description">
            Turn the ingredients you already have into
            delicious meals. Add your ingredients and
            let Smart Recipe find the perfect recipes for you.
          </p>

          <div className="hero-buttons">

            <Link
              to="/smart-match"
              className="primary-hero-button"
            >
              Find My Recipes →
            </Link>

            <Link
              to="/recipes"
              className="secondary-hero-button"
            >
              Explore Recipes
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>12+</strong>
              <span>Recipes</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Ingredient Based</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Possibilities</span>
            </div>

          </div>

        </div>

        <div className="hero-image-section">

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh ingredients"
            />

            <div className="floating-card">

              <span className="floating-icon">
                ✓
              </span>

              <div>
                <strong>Smart Match</strong>
                <p>Find recipes from your ingredients</p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK SEARCH ================= */}

      <section className="home-search-section">

        <div className="section-heading">

          <p className="section-label">
            START HERE
          </p>

          <h2>
            What's in your kitchen?
          </h2>

          <p>
            Enter your ingredients and discover what you can cook.
          </p>

        </div>

        <div className="quick-search-box">

          <input
            type="text"
            placeholder="e.g. tomato, potato, onion..."
          />

          <Link
            to="/smart-match"
            className="search-button"
          >
            Find Recipes
          </Link>

        </div>

      </section>


      {/* ================= POPULAR RECIPES ================= */}

      <section className="popular-section">

        <div className="section-top">

          <div>

            <p className="section-label">
              DISCOVER
            </p>

            <h2>
              Popular recipes
            </h2>

          </div>

          <Link
            to="/recipes"
            className="view-all"
          >
            View all →
          </Link>

        </div>


        <div className="recipe-preview-grid">

          <div className="recipe-preview-card">

            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=85"
              alt="Vegetable Fried Rice"
            />

            <div className="recipe-preview-info">

              <span>RICE</span>

              <h3>
                Vegetable Fried Rice
              </h3>

              <p>
                25 min · Easy
              </p>

            </div>

          </div>


          <div className="recipe-preview-card">

            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85"
              alt="Aloo Tomato Curry"
            />

            <div className="recipe-preview-info">

              <span>CURRY</span>

              <h3>
                Aloo Tomato Curry
              </h3>

              <p>
                30 min · Easy
              </p>

            </div>

          </div>


          <div className="recipe-preview-card">

            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85"
              alt="Masala Omelette"
            />

            <div className="recipe-preview-info">

              <span>BREAKFAST</span>

              <h3>
                Masala Omelette
              </h3>

              <p>
                15 min · Easy
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="section-heading">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            From ingredients to dinner.
          </h2>

          <p>
            Three simple steps. Zero kitchen confusion.
          </p>

        </div>


        <div className="steps-grid">

          <div className="step-card">

            <span className="step-number">
              01
            </span>

            <h3>
              Add ingredients
            </h3>

            <p>
              Tell us what ingredients you already
              have in your kitchen.
            </p>

          </div>


          <div className="step-card">

            <span className="step-number">
              02
            </span>

            <h3>
              Smart matching
            </h3>

            <p>
              Our matching system compares your
              ingredients with available recipes.
            </p>

          </div>


          <div className="step-card">

            <span className="step-number">
              03
            </span>

            <h3>
              Start cooking
            </h3>

            <p>
              Pick your recipe, check what's missing,
              and get cooking.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <p className="section-label">
            READY?
          </p>

          <h2>
            Let's see what you can cook.
          </h2>

          <p>
            Your next favourite meal might already
            be sitting in your kitchen.
          </p>

          <Link
            to="/smart-match"
            className="cta-button"
          >
            Start Smart Matching →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-logo">
          <span>SMART</span> RECIPE
        </div>

        <p>
          Cook smarter. Waste less. Enjoy more.
        </p>

        <div className="footer-links">

          <Link to="/recipes">
            Recipes
          </Link>

          <Link to="/smart-match">
            Smart Match
          </Link>

          <Link to="/favorites">
            Favorites
          </Link>

          <Link to="/about">
            About
          </Link>

        </div>

        <div className="footer-bottom">
          © 2026 Smart Recipe · DSA Project
        </div>

      </footer>

    </div>
  );
}

export default Home;