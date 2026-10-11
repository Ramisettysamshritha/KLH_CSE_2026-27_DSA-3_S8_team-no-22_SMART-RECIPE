import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-label">
            ABOUT SMART RECIPE
          </p>

          <h1>
            Less searching.
            <br />
            <span>More cooking.</span>
          </h1>

          <p className="about-hero-text">
            Smart Recipe helps you discover delicious
            recipes using the ingredients you already
            have in your kitchen.
          </p>

        </div>

        <div className="about-hero-number">
          <span>01</span>
          <p>
            Smart recipe discovery
            powered by data
            structures and algorithms.
          </p>
        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="about-intro">

        <div className="about-intro-heading">

          <p className="section-label">
            WHY SMART RECIPE?
          </p>

          <h2>
            Your ingredients
            <br />
            are the starting point.
          </h2>

        </div>

        <div className="about-intro-text">

          <p>
            We built Smart Recipe around a simple
            problem: sometimes you have ingredients
            at home but don't know what to cook.
          </p>

          <p>
            Instead of searching through hundreds of
            recipes manually, enter the ingredients
            you already have and let the system find
            the recipes that match them.
          </p>

          <p>
            The result is a faster, smarter and more
            practical way to decide what to cook.
          </p>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="about-process">

        <div className="about-process-heading">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            From ingredients
            <br />
            to recipe.
          </h2>

        </div>

        <div className="process-grid">

          <div className="process-card">

            <span>01</span>

            <div>
              <h3>
                Enter ingredients
              </h3>

              <p>
                Add any number of ingredients that
                are currently available in your kitchen.
              </p>
            </div>

          </div>


          <div className="process-card">

            <span>02</span>

            <div>
              <h3>
                Normalize the data
              </h3>

              <p>
                Ingredient names are converted into
                a consistent format so matching can
                be performed accurately.
              </p>
            </div>

          </div>


          <div className="process-card">

            <span>03</span>

            <div>
              <h3>
                Match ingredients
              </h3>

              <p>
                The system compares user ingredients
                with the ingredients required by each
                recipe.
              </p>
            </div>

          </div>


          <div className="process-card">

            <span>04</span>

            <div>
              <h3>
                Rank the recipes
              </h3>

              <p>
                Recipes are ranked according to how
                closely they match the ingredients
                provided by the user.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DSA ================= */}

      <section className="about-dsa">

        <div className="dsa-heading">

          <p className="section-label">
            DSA IMPLEMENTATION
          </p>

          <h2>
            The algorithm
            <br />
            behind the kitchen.
          </h2>

          <p>
            Smart Recipe isn't just a recipe website.
            The recommendation system uses data
            structures and algorithms to process,
            compare and rank recipe information.
          </p>

        </div>


        <div className="dsa-content">

          <div className="dsa-item">

            <div className="dsa-number">
              01
            </div>

            <div>
              <h3>
                Searching
              </h3>

              <p>
                The recipe collection is searched
                based on the ingredients entered by
                the user. Search functionality also
                allows recipes to be found by name
                and category.
              </p>
            </div>

          </div>


          <div className="dsa-item">

            <div className="dsa-number">
              02
            </div>

            <div>
              <h3>
                Set Intersection
              </h3>

              <p>
                User ingredients and recipe ingredients
                are compared to identify the common
                elements. These common ingredients
                represent the ingredients available
                to the user.
              </p>
            </div>

          </div>


          <div className="dsa-item">

            <div className="dsa-number">
              03
            </div>

            <div>
              <h3>
                Matching Score
              </h3>

              <p>
                A match percentage is calculated using
                the number of matched ingredients
                compared with the total ingredients
                required by the recipe.
              </p>
            </div>

          </div>


          <div className="dsa-item">

            <div className="dsa-number">
              04
            </div>

            <div>
              <h3>
                Sorting
              </h3>

              <p>
                Recipes are sorted according to their
                matching percentage so that the most
                relevant recipes appear first.
              </p>
            </div>

          </div>


          <div className="dsa-item">

            <div className="dsa-number">
              05
            </div>

            <div>
              <h3>
                Filtering
              </h3>

              <p>
                Recipes can be filtered by category,
                searched by name and sorted according
                to different criteria in the recipe
                explorer.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= ALGORITHM FLOW ================= */}

      <section className="algorithm-section">

        <div className="algorithm-heading">

          <p className="section-label">
            SMART MATCH FLOW
          </p>

          <h2>
            How your ingredients
            <br />
            become recommendations.
          </h2>

        </div>


        <div className="algorithm-flow">

          <div className="algorithm-step">
            <strong>01</strong>
            <span>User Ingredients</span>
          </div>

          <div className="algorithm-arrow">
            →
          </div>

          <div className="algorithm-step">
            <strong>02</strong>
            <span>Normalize</span>
          </div>

          <div className="algorithm-arrow">
            →
          </div>

          <div className="algorithm-step">
            <strong>03</strong>
            <span>Compare</span>
          </div>

          <div className="algorithm-arrow">
            →
          </div>

          <div className="algorithm-step">
            <strong>04</strong>
            <span>Calculate Match %</span>
          </div>

          <div className="algorithm-arrow">
            →
          </div>

          <div className="algorithm-step">
            <strong>05</strong>
            <span>Sort & Rank</span>
          </div>

        </div>

      </section>


      {/* ================= TECHNOLOGY ================= */}

      <section className="technology-section">

        <div className="technology-heading">

          <p className="section-label">
            TECHNOLOGY
          </p>

          <h2>
            Built with
            <br />
            practical tools.
          </h2>

        </div>


        <div className="technology-grid">

          <div className="technology-card">
            <span>01</span>
            <h3>React</h3>
            <p>
              Used to build the interactive frontend
              and reusable user interface components.
            </p>
          </div>

          <div className="technology-card">
            <span>02</span>
            <h3>Node.js</h3>
            <p>
              Provides the runtime environment for
              the application backend.
            </p>
          </div>

          <div className="technology-card">
            <span>03</span>
            <h3>Express</h3>
            <p>
              Handles backend routes and communication
              between the frontend and recipe data.
            </p>
          </div>

          <div className="technology-card">
            <span>04</span>
            <h3>JSON</h3>
            <p>
              Stores recipe and user data without
              requiring a relational database.
            </p>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div>

          <p className="about-cta-label">
            READY TO COOK?
          </p>

          <h2>
            See what you
            <br />
            can make.
          </h2>

          <p>
            Enter the ingredients you already have
            and discover your next meal.
          </p>

        </div>

        <div className="about-cta-buttons">

          <Link
            to="/smart-match"
            className="about-primary-button"
          >
            Try Smart Match →
          </Link>

          <Link
            to="/recipes"
            className="about-secondary-button"
          >
            Explore Recipes
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;