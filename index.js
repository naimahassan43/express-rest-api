const express = require("express");
const app = express();
const Joi = require("joi");

const { v4: uuidv4 } = require("uuid");

//Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const products = [
  { id: "1", name: "Mango", price: 234 },
  { id: "2", name: "Orange", price: 154 },
  { id: "3", name: "Blackberry", price: 214 },
  { id: "4", name: "Melon", price: 134 },
  { id: "5", name: "Apple", price: 200 },
];
//Show list of products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//show a specific product
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((prod) => prod.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
});

//Insert a new product
app.use(express.json());

app.post("/api/products", (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const product = {
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
  };

  products.push(product);
  return res.json(product);
});
//Update a specific product(PUT)

//Update a specific product(PATCH)

//Delete a specific product
//Delete all products

// validation function
function validation(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().required(),
  });

  return schema.validate(body);
}
app.listen(3000, () => {
  console.log("listening on port 3000");
});
