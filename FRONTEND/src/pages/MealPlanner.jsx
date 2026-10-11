import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MealPlanner.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MEAL_TYPES = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

const STORAGE_KEY = "smartRecipeMealPlan";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85";

function MealPlanner() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecipes();
    loadMealPlan();
  }, []);

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

      setRecipes(data.recipes || []);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load recipes. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMealPlan = () => {
    const savedPlan =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {};

    setMealPlan(savedPlan);
  };

  const getSlotKey = (day, meal) => {
    return `${day}-${meal}`;
  };

  const addMeal = () => {
    if (!selectedRecipe) {
      return;
    }

    const recipe = recipes.find(
      (item) =>
        String(item.id) === String(selectedRecipe)
    );

    if (!recipe) {
      return;
    }

    const slotKey = getSlotKey(
      selectedDay,
      selectedMeal
    );

    const updatedPlan = {
      ...mealPlan,
      [slotKey]: {
        day: selectedDay,
        meal: selectedMeal,
        recipe,
      },
    };

    setMealPlan(updatedPlan);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPlan)
    );

    setSelectedRecipe("");
  };

  const removeMeal = (day, meal) => {
    const slotKey = getSlotKey(day, meal);

    const updatedPlan = {
      ...mealPlan,
    };

    delete updatedPlan[slotKey];

    setMealPlan(updatedPlan);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPlan)
    );
  };

  const clearPlanner = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMealPlan({});
  };

  const plannedMeals = useMemo(() => {
    return Object.values(mealPlan);
  }, [mealPlan]);

  const totalMeals = plannedMeals.length;

  const uniqueRecipes = new Set(
    plannedMeals.map((item) =>
      String(item.recipe.id)
    )
  ).size;

  const getMeal = (day, meal) => {
    return mealPlan[getSlotKey(day, meal)];
  };

  return (
    <div className="meal-planner-page">

      {/* ================= HERO ================= */}

      <section className="meal-planner-hero">

        <div className="meal-planner-hero-content">

          <p className="meal-planner-label">
            PLAN YOUR WEEK
          </p>

          <h1>
            Your week,
            <br />
            <span>planned.</span>
          </h1>

          <p className="meal-planner-intro">
            Take the stress out of deciding what to
            cook. Plan your breakfasts, lunches and
            dinners for the entire week.
          </p>

        </div>

        <div className="meal-planner-stats">

          <div className="planner-stat">
            <strong>{totalMeals}</strong>
            <span>Planned Meals</span>
          </div>

          <div className="planner-stat">
            <strong>{uniqueRecipes}</strong>
            <span>Recipes Used</span>
          </div>

          <div className="planner-stat">
            <strong>7</strong>
            <span>Days</span>
          </div>

        </div>

      </section>

      {/* ================= PLANNER CONTROLS ================= */}

      <section className="planner-controls-section">

        <div className="planner-section-heading">

          <div>
            <p className="section-label">
              BUILD YOUR WEEK
            </p>

            <h2>
              Add a meal
            </h2>
          </div>

          {totalMeals > 0 && (
            <button
              className="clear-planner-button"
              onClick={clearPlanner}
            >
              Clear Planner
            </button>
          )}

        </div>

        <div className="planner-form">

          <div className="planner-form-group">

            <label>
              DAY
            </label>

            <select
              value={selectedDay}
              onChange={(e) =>
                setSelectedDay(e.target.value)
              }
            >
              {DAYS.map((day) => (
                <option
                  key={day}
                  value={day}
                >
                  {day}
                </option>
              ))}
            </select>

          </div>

          <div className="planner-form-group">

            <label>
              MEAL
            </label>

            <select
              value={selectedMeal}
              onChange={(e) =>
                setSelectedMeal(e.target.value)
              }
            >
              {MEAL_TYPES.map((meal) => (
                <option
                  key={meal}
                  value={meal}
                >
                  {meal}
                </option>
              ))}
            </select>

          </div>

          <div className="planner-form-group recipe-select-group">

            <label>
              RECIPE
            </label>

            <select
              value={selectedRecipe}
              onChange={(e) =>
                setSelectedRecipe(e.target.value)
              }
              disabled={loading}
            >
              <option value="">
                {loading
                  ? "Loading recipes..."
                  : "Choose a recipe"}
              </option>

              {recipes.map((recipe) => (
                <option
                  key={recipe.id}
                  value={recipe.id}
                >
                  {recipe.name}
                </option>
              ))}
            </select>

          </div>

          <button
            className="add-meal-button"
            onClick={addMeal}
            disabled={!selectedRecipe || loading}
          >
            + Add Meal
          </button>

        </div>

        {error && (
          <div className="planner-error">
            {error}
          </div>
        )}

      </section>

      {/* ================= WEEKLY PLANNER ================= */}

      <section className="weekly-planner-section">

        <div className="planner-section-heading">

          <div>
            <p className="section-label">
              YOUR WEEK
            </p>

            <h2>
              Weekly meal plan
            </h2>
          </div>

        </div>

        <div className="weekly-planner">

          {DAYS.map((day) => (

            <div
              className="day-column"
              key={day}
            >

              <div className="day-header">
                <span className="day-number">
                  {String(
                    DAYS.indexOf(day) + 1
                  ).padStart(2, "0")}
                </span>

                <h3>{day}</h3>
              </div>

              <div className="day-meals">

                {MEAL_TYPES.map((meal) => {

                  const plannedMeal =
                    getMeal(day, meal);

                  return (
                    <div
                      className={
                        plannedMeal
                          ? "meal-slot filled"
                          : "meal-slot"
                      }
                      key={meal}
                    >

                      <div className="meal-slot-header">

                        <span>
                          {meal}
                        </span>

                        {plannedMeal && (
                          <button
                            className="remove-meal-button"
                            onClick={() =>
                              removeMeal(
                                day,
                                meal
                              )
                            }
                            title="Remove meal"
                          >
                            ×
                          </button>
                        )}

                      </div>

                      {plannedMeal ? (

                        <Link
                          to={`/recipe/${plannedMeal.recipe.id}`}
                          className="planned-recipe"
                        >

                          <div className="planned-recipe-image">

                            <img
                              src={
                                plannedMeal.recipe
                                  .image ||
                                FALLBACK_IMAGE
                              }
                              alt={
                                plannedMeal.recipe.name
                              }
                              onError={(e) => {
                                e.currentTarget.src =
                                  FALLBACK_IMAGE;
                              }}
                            />

                          </div>

                          <div className="planned-recipe-info">

                            <h4>
                              {plannedMeal.recipe.name}
                            </h4>

                            <span>
                              {plannedMeal.recipe.cookingTime ||
                                "—"}
                            </span>

                          </div>

                        </Link>

                      ) : (

                        <div className="empty-meal-slot">

                          <span>
                            No meal planned
                          </span>

                          <button
                            onClick={() => {
                              setSelectedDay(day);
                              setSelectedMeal(meal);
                              window.scrollTo({
                                top: 300,
                                behavior: "smooth",
                              });
                            }}
                          >
                            + Add
                          </button>

                        </div>

                      )}

                    </div>
                  );
                })}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= TIPS ================= */}

      <section className="planner-tips">

        <div className="planner-tips-content">

          <p className="section-label">
            PLAN SMARTER
          </p>

          <h2>
            A little planning
            <br />
            goes a long way.
          </h2>

          <p>
            Use your Smart Recipe collection to
            plan balanced meals, reduce last-minute
            decisions and make better use of the
            ingredients already in your kitchen.
          </p>

          <Link
            to="/smart-match"
            className="planner-tips-button"
          >
            Find Recipes From Ingredients →
          </Link>

        </div>

        <div className="planner-tips-list">

          <div className="planner-tip">
            <span>01</span>
            <div>
              <h3>
                Start with what you have
              </h3>
              <p>
                Use Smart Match to discover recipes
                before planning your meals.
              </p>
            </div>
          </div>

          <div className="planner-tip">
            <span>02</span>
            <div>
              <h3>
                Plan across the week
              </h3>
              <p>
                Assign different meals to each day
                and avoid repeating the same recipe.
              </p>
            </div>
          </div>

          <div className="planner-tip">
            <span>03</span>
            <div>
              <h3>
                Save your favourites
              </h3>
              <p>
                Keep recipes you love ready for your
                next meal plan.
              </p>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default MealPlanner;