const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true })); // 🟢 For form data

// Serve HTML files from "public"
app.use(express.static(path.join(__dirname, "public")));

// 🟢 GET route to serve the form (optional if using static)
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// 🟢 POST route to handle the form submission
const users = {};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log("Received:", req.body); // ✅ Debug log

  if (!username || !password) return res.status(400).send("Missing fields");
  if (users[username]) return res.status(400).send("User exists");

  users[username] = password;
  res.send(`<h2>Registered Successfully. Hello, ${username}!</h2>`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));


