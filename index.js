const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));



// Serve static HTML pages
app.use(express.static("public"));

const users = {};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).send("User exists");
  users[username] = password;
  res.send("Registered");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] !== password) return res.status(401).send("Invalid");
  res.json({ token: Math.random().toString(36).substring(2) });
});

app.listen(3000, '0.0.0.0', () => console.log("User Service on 3000"));
