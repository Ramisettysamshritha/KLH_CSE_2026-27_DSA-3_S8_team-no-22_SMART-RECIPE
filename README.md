# 🍳 Smart Recipe

### DSA-3 Project | KLH University | Team No. 22

**Smart Recipe** is a web-based recipe recommendation system that helps users discover recipes based on the ingredients they already have.

Instead of searching through recipes manually, users can enter any number of available ingredients and the system intelligently matches them with recipes, calculates the matching percentage, identifies missing ingredients, and ranks the most relevant recipes first.

---

## 📌 Project Overview

Finding a suitable recipe from the ingredients available at home can be time-consuming. Users often need to search through multiple recipes before finding one that matches what they already have.

Smart Recipe solves this problem by providing an ingredient-based recipe recommendation system.

The user can:

- Enter one or more ingredients
- Add unlimited ingredients dynamically
- Find recipes matching those ingredients
- View matching and missing ingredients
- Compare recipe relevance using match percentage
- Explore complete recipe details
- Save favourite recipes
- Plan meals for the week
- Browse the complete recipe collection

The project demonstrates the practical application of **Data Structures and Algorithms** in a real-world web application.

---

## 🎯 Problem Statement

Users often have a collection of ingredients but do not know what dishes can be prepared using them.

Traditional recipe searching requires users to manually search for dishes and compare their ingredients.

The objective of Smart Recipe is to develop a system that automatically:

1. Accepts ingredients provided by the user.
2. Searches the available recipe dataset.
3. Finds ingredients common between the user's input and each recipe.
4. Identifies ingredients that are missing.
5. Calculates a matching percentage.
6. Ranks recipes according to their relevance.
7. Displays the most suitable recipes to the user.

---

## 🎯 Objectives

- Develop an intelligent ingredient-based recipe recommendation system.
- Allow users to enter any number of ingredients.
- Apply searching and matching techniques to recipe data.
- Calculate recipe matching percentages.
- Identify matched and missing ingredients.
- Rank recipes based on their relevance.
- Provide an easy-to-use web interface.
- Implement additional features such as favourites and meal planning.
- Demonstrate practical applications of DSA concepts.

---

## ✨ Key Features

### 🔐 User Authentication

- User registration
- Login functionality
- Email-based account identification
- Password validation
- Protected application pages
- Logout functionality

### 🥕 Smart Ingredient Matching

Users can enter any number of ingredients available in their kitchen.

The system compares the entered ingredients with recipe ingredients and finds suitable recipes.

### 📊 Match Percentage

Each recipe receives a matching percentage based on how many of its required ingredients are available.

### 🔎 Recipe Searching

Users can search through the recipe collection using recipe names and available filters.

### 🏆 Recipe Ranking

Recipes are sorted according to their matching relevance so that the most suitable recipes appear first.

### ❤️ Favorites

Users can save recipes they like and access them later from the Favorites section.

### 📅 Meal Planner

Users can plan:

- Breakfast
- Lunch
- Dinner

for each day of the week.

### 🍽️ Recipe Details

Each recipe provides:

- Recipe name
- Category
- Cooking time
- Difficulty
- Ingredients
- Cooking instructions
- Favorite option

### 📚 Recipe Explorer

Users can browse the complete recipe collection and filter recipes according to categories.

---

# 🧠 Data Structures & Algorithms

The main purpose of this project is to demonstrate the practical implementation of DSA concepts.

## 1. Arrays

Arrays are used to store collections such as:

- Recipe records
- Ingredients
- Matched ingredients
- Missing ingredients
- Favorite recipes
- Meal plans

Example:

```javascript
const recipes = [];
