import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import SmartMatch from "./pages/SmartMatch";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";


/* =========================================================
   CHECK LOGIN
   ========================================================= */

function isLoggedIn() {
  return Boolean(
    localStorage.getItem("smartRecipeUser")
  );
}


/* =========================================================
   PROTECTED ROUTE
   ========================================================= */

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* =========================================================
   AUTH ROUTE
   Prevent logged-in users from opening Login/Signup
   ========================================================= */

function AuthRoute({ children }) {
  if (isLoggedIn()) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}


/* =========================================================
   APP
   ========================================================= */

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="app">

      {/* Navbar should NOT appear on Login / Signup */}

      {!isAuthPage && <Navbar />}


      <Routes>

        {/* =================================================
            HOME
            ================================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            LOGIN
            ================================================= */}

        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />


        {/* =================================================
            SIGNUP
            ================================================= */}

        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />


        {/* =================================================
            RECIPES
            ================================================= */}

        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <Recipes />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            SMART MATCH
            ================================================= */}

        <Route
          path="/smart-match"
          element={
            <ProtectedRoute>
              <SmartMatch />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            RECIPE DETAILS
            ================================================= */}

        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            FAVORITES
            ================================================= */}

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            MEAL PLANNER
            ================================================= */}

        <Route
          path="/meal-planner"
          element={
            <ProtectedRoute>
              <MealPlanner />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ABOUT
            ================================================= */}

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            UNKNOWN URL
            ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                isLoggedIn()
                  ? "/"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;