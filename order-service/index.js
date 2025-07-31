const express = require("express");
const app = express();
app.use(express.json());

const orders = {};

app.post("/order", (req, res) => {
  const { username, item, quantity } = req.body;
  if (!orders[username]) orders[username] = [];
  orders[username].push({ item, quantity });
  res.send("Order placed");
});

app.get("/orders/:username", (req, res) => {
  res.json(orders[req.params.username] || []);
});

app.listen(3001, () => console.log("Order Service on 3001"));
