const express = require("express");
const app = express();

//Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const products = [
  { id: 1, name: "Mango", price: 234 },
  { id: 2, name: "Orange", price: 154 },
  { id: 3, name: "Blackberry", price: 214 },
  { id: 4, name: "Melon", price: 134 },
  { id: 5, name: "Apple", price: 200 },
];
//Show list of products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//show a specific product

//Insert a new product

//Update a specific product(PUT)

//Update a specific product(PATCH)

//Delete a specific product
//Delete all products
app.listen(3000, () => {
  console.log("listening on port 3000");
});
