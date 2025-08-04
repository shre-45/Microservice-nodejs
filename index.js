const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // important for form data

// Serve static files
app.use(express.static("public"));

// Serve HTML pages without .html in URL
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// In-memory user store
const users = {};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Missing fields");
  if (users[username]) return res.status(400).send("User exists");
  users[username] = password;
  res.redirect("/login"); // redirect to login page
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] !== password) return res.status(401).send("Invalid credentials");
  res.send(`<h2>Welcome ${username}!</h2>`);
});

app.listen(3000, '0.0.0.0', () => console.log("User Service running on port 3000"));

