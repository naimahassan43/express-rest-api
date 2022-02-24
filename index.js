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
//Update a specific product(PUT- all information edit)
app.put("/api/products/:id", (req, res) => {
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).json({ message: error.datails[0].message });
  }
  const index = products.findIndex((prod) => prod.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      message: "Product is not found with this id",
    });
  }
  products[index].name = req.body.name;
  products[index].price = req.body.price;

  return res.json({ product: products[index] });
});
//Update a specific product(PATCH- some information edit)
app.patch("/api/products/:id", (req, res) => {
  const index = products.findIndex((prod) => prod.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  let updatedProduct = {
    ...products[index],
    ...req.body,
  };
  products[index] = updatedProduct;
  return res.json(updatedProduct);
});
//Delete a specific product
app.delete("/api/products/:id", (req, res) => {
  const product = products.find((prod) => prod.id === req.params.id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const index = products.findIndex((prod) => prod.id === req.params.id);
  products.splice(index, 1);

  return res.json(product);
});
//Delete all products
app.delete("/api/products", (req, res) => {
  products.splice(0);
  return res.json(products);
});

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
