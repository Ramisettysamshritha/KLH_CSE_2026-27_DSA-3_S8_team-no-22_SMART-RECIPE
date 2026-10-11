import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Signup.css";


function Signup() {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /* =========================================================
     SIGNUP
     ========================================================= */

  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Unable to create account."
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

    <div className="signup-page">

      <div className="signup-container">


        {/* =================================================
            SIGNUP FORM
            ================================================= */}

        <div className="signup-form-section">

          <div className="signup-form">


            {/* HEADING */}

            <div className="signup-heading">

              <p className="signup-label">
                CREATE YOUR ACCOUNT
              </p>

              <h2>
                Start cooking smarter.
              </h2>

              <p>
                Create an account and make every
                ingredient count.
              </p>

            </div>


            {/* FORM */}

            <form onSubmit={handleSignup}>


              {/* NAME */}

              <div className="signup-form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="signup-form-group">

                <label htmlFor="signup-email">
                  Email Address
                </label>

                <input
                  id="signup-email"
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

              <div className="signup-form-group">

                <label htmlFor="signup-password">
                  Password
                </label>


                <div className="signup-password-input">

                  <input
                    id="signup-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
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
                    className="signup-show-password"
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


              {/* CONFIRM PASSWORD */}

              <div className="signup-form-group">

                <label htmlFor="confirm-password">
                  Confirm Password
                </label>


                <div className="signup-password-input">

                  <input
                    id="confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    required
                  />


                  <button
                    type="button"
                    className="signup-show-password"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
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


              {/* TERMS */}

              <div className="terms-row">

                <label>

                  <input
                    type="checkbox"
                    required
                  />

                  <span>

                    I agree to the{" "}

                    <a href="#terms">
                      Terms & Conditions
                    </a>

                  </span>

                </label>

              </div>


              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </form>


            {/* DIVIDER */}

            <div className="signup-divider">

              <span>
                OR
              </span>

            </div>


            {/* GOOGLE */}

            <button
              type="button"
              className="signup-google"
            >

              <span className="signup-google-icon">
                G
              </span>

              Continue with Google

            </button>


            {/* LOGIN */}

            <p className="signup-switch">

              Already have an account?

              {" "}

              <Link to="/login">
                Login
              </Link>

            </p>

          </div>

        </div>


        {/* =================================================
            RIGHT VISUAL
            ================================================= */}

        <div className="signup-visual">

          <div className="signup-visual-content">


            <p className="signup-visual-small">
              YOUR KITCHEN. YOUR RULES.
            </p>


            <h1>
              Cook.
              <br />
              Create.
              <br />
              Enjoy.
            </h1>


            <p className="signup-visual-text">
              Discover recipes based on what is
              already sitting in your kitchen.
            </p>


            <div className="signup-features">


              <div>

                <strong>
                  01
                </strong>

                <span>
                  Smart ingredient matching
                </span>

              </div>


              <div>

                <strong>
                  02
                </strong>

                <span>
                  Save your favorite recipes
                </span>

              </div>


              <div>

                <strong>
                  03
                </strong>

                <span>
                  Plan your meals effortlessly
                </span>

              </div>


            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Signup;