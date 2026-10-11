import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Login.css";


function Login() {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /* =========================================================
     LOGIN
     ========================================================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Invalid email or password."
        );

        setLoading(false);

        return;
      }


      /* Save user */

      localStorage.setItem(
        "smartRecipeUser",
        JSON.stringify(data.user)
      );


      /* Notify application */

      window.dispatchEvent(
        new Event(
          "smartRecipeAuthChanged"
        )
      );


      /* Go Home */

      navigate("/", {
        replace: true,
      });


    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-container">


        {/* =================================================
            LEFT IMAGE / VISUAL
            ================================================= */}

        <div className="auth-visual">

          <div className="visual-overlay">

            <p className="visual-small">
              WELCOME TO
            </p>


            <h1>
              Smart
              <br />
              Recipe.
            </h1>


            <p className="visual-text">
              Turn the ingredients you already
              have into something delicious.
            </p>


            <div className="visual-stat">

              <strong>
                30+
              </strong>

              <span>
                Recipes waiting for you
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            LOGIN FORM
            ================================================= */}

        <div className="auth-form-section">

          <div className="auth-form">


            {/* HEADING */}

            <div className="auth-heading">

              <p className="auth-label">
                WELCOME BACK
              </p>

              <h2>
                Let's get cooking.
              </h2>

              <p>
                Sign in to continue your
                Smart Recipe journey.
              </p>

            </div>


            {/* FORM */}

            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <div className="password-label">

                  <label htmlFor="password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>

                </div>


                <div className="password-input">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />


                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* ERROR */}

              {error && (

                <p
                  style={{
                    color: "#c0392b",
                    fontSize: "14px",
                    marginBottom: "15px",
                  }}
                >
                  {error}
                </p>

              )}


              {/* REMEMBER */}

              <div className="remember-row">

                <label>

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

              </div>


              {/* LOGIN */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >

                {loading
                  ? "Signing In..."
                  : "Login"}

              </button>

            </form>


            {/* DIVIDER */}

            <div className="auth-divider">

              <span>
                OR
              </span>

            </div>


            {/* GOOGLE */}

            <button
              type="button"
              className="google-button"
            >

              <span className="google-icon">
                G
              </span>

              Continue with Google

            </button>


            {/* SIGNUP */}

            <p className="auth-switch">

              Don't have an account?

              {" "}

              <Link to="/signup">
                Create one
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Login;