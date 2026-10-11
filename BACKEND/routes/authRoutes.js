const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersPath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  const data = fs.readFileSync(usersPath, "utf-8");

  if (!data.trim()) {
    return [];
  }

  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(
    usersPath,
    JSON.stringify(users, null, 2)
  );
};

/* =========================
   SIGN UP
========================= */

router.post("/signup", (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields."
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters."
      });
    }

    const users = getUsers();

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUsers(users);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create account."
    });
  }
});

/* =========================
   LOGIN
========================= */

router.post("/login", (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password."
      });
    }

    const users = getUsers();

    const normalizedEmail = email.toLowerCase().trim();

    const user = users.find(
      (user) =>
        user.email === normalizedEmail &&
        user.password === password
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to login."
    });
  }
});

module.exports = router;