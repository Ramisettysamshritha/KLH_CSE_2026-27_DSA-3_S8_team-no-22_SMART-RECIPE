import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef(null);

  /* =========================================================
     LOAD USER
     ========================================================= */

  useEffect(() => {
    const loadUser = () => {
      const savedUser =
        localStorage.getItem("smartRecipeUser");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error(
            "Unable to load user.",
            error
          );

          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener(
      "smartRecipeAuthChanged",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "smartRecipeAuthChanged",
        loadUser
      );
    };
  }, []);


  /* =========================================================
     CLOSE ACCOUNT MENU WHEN CLICKING OUTSIDE
     ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  /* =========================================================
     LOGOUT
     ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "smartRecipeUser"
    );

    setUser(null);
    setAccountOpen(false);

    window.dispatchEvent(
      new Event("smartRecipeAuthChanged")
    );

    navigate("/login", {
      replace: true,
    });
  };


  /* =========================================================
     ACCOUNT BUTTON
     ========================================================= */

  const handleAccountClick = () => {
    setAccountOpen((previous) => !previous);
  };


  return (
    <nav className="navbar">

      {/* =====================================================
          LOGO
          ===================================================== */}

      <NavLink
        to="/"
        className="navbar-logo"
      >
        <span>SMART</span> RECIPE
      </NavLink>


      {/* =====================================================
          NAVIGATION LINKS
          ===================================================== */}

      <div className="navbar-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Recipes
        </NavLink>


        <NavLink
          to="/smart-match"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Smart Match
        </NavLink>


        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Favorites
        </NavLink>


        <NavLink
          to="/meal-planner"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Meal Planner
        </NavLink>


        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          About
        </NavLink>

      </div>


      {/* =====================================================
          ACCOUNT
          ===================================================== */}

      <div
        className="navbar-account"
        ref={accountRef}
      >

        <button
          type="button"
          className={
            accountOpen
              ? "account-button open"
              : "account-button"
          }
          onClick={handleAccountClick}
          aria-label="Account menu"
          aria-expanded={accountOpen}
        >

          {/* Account icon */}

          <span className="account-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="8"
                r="3.5"
              />

              <path
                d="M5 20C5.8 16.8 8.2 15 12 15C15.8 15 18.2 16.8 19 20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

          </span>


          {/* Small arrow */}

          <span className="account-arrow">
            {accountOpen ? "⌃" : "⌄"}
          </span>

        </button>


        {/* =================================================
            DROPDOWN
            ================================================= */}

        {accountOpen && (

          <div className="account-dropdown">

            {user ? (

              <>
                {/* USER INFORMATION */}

                <div className="account-user">

                  <div className="account-avatar">
                    {user.name
                      ? user.name
                          .charAt(0)
                          .toUpperCase()
                      : "U"}
                  </div>

                  <div className="account-user-details">

                    <strong>
                      {user.name || "User"}
                    </strong>

                    <span>
                      {user.email}
                    </span>

                  </div>

                </div>


                <div className="account-divider" />


                {/* LOGOUT */}

                <button
                  type="button"
                  className="account-menu-item logout-item"
                  onClick={handleLogout}
                >

                  <span>
                    ↪
                  </span>

                  Logout

                </button>

              </>

            ) : (

              <>
                {/* LOGIN */}

                <button
                  type="button"
                  className="account-menu-item"
                  onClick={() => {
                    setAccountOpen(false);
                    navigate("/login");
                  }}
                >

                  <span>
                    → 
                  </span>

                  Login

                </button>


                {/* SIGN UP */}

                <button
                  type="button"
                  className="account-menu-item"
                  onClick={() => {
                    setAccountOpen(false);
                    navigate("/signup");
                  }}
                >

                  <span>
                    +
                  </span>

                  Sign Up

                </button>

              </>

            )}

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;