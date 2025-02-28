// DOM Elements
const signupForm = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Sign Up Functionality
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Validate inputs
  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Check if username already exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    alert("Username already exists. Please choose another one.");
    return;
  }

  // Create new user
  const newUser = {
    username: username,
    email: email,
    password: password, // In a real app, hash the password before saving!
    tasks: [], // Initialize an empty task list for the user
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! Redirecting to login page...");
  window.location.href = "login.html"; // Redirect to login page
});