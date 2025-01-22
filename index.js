const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data
let users = [
  {
    id: 1,
    name: "John Doe",
    mobileNumber: "1234567890",
    customerCode: "CUST001",
    cartType: "Standard",
    address: "123 Street, City, Country",
    relation: "Self",
    description: "Regular customer",
  },
  {
    id: 2,
    name: "Jane Doe",
    mobileNumber: "9876543210",
    customerCode: "CUST002",
    cartType: "Premium",
    address: "456 Avenue, City, Country",
    relation: "Family",
    description: "Premium customer",
  },
];

// Routes

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Create a new user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    customerCode: req.body.customerCode,
    cartType: req.body.cartType,
    address: req.body.address,
    relation: req.body.relation,
    description: req.body.description,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name || user.name;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.customerCode = req.body.customerCode || user.customerCode;
    user.cartType = req.body.cartType || user.cartType;
    user.address = req.body.address || user.address;
    user.relation = req.body.relation || user.relation;
    user.description = req.body.description || user.description;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
