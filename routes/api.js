import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const categories = ["women", " men", " kids"];
const items = [
  {  name: "Item 1", category: "women", price: 50 , id: uuidv4()},
  {  name: "Item 2", category: "men", price: 50, id: uuidv4() },
  {  name: "Item 3", category: "kids", price: 50, id: uuidv4() },
];

let cart = {
  items: [],
  total: 0,
};

router.get("/categories", (req, res) => {
  res.send(categories);
});

router.get("/items", (req, res) => {
  res.send(items);
});

router.post("/items", (req, res) => {
   const item = req.body;
   const itemId = uuidv4();
   const itemWithId = { ...item, id: itemId };
   items.push(itemWithId);
   res.send(`${item.name} added successfully`);
});

router.get("/items-by-category/:category", (req, res) => {
  const category = req.params.category;
  const filteredItems = items.filter((item) => item.category === category);
  res.send(filteredItems);
});

router.get("/cart", (req, res) => {
  res.send(cart);
});

// Update cart
router.post('/cart', (req, res) => {
  const { itemId, quantity } = req.body;

  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const cartItem = cart.items.find((item) => item.itemId === itemId);

  if (cartItem) {
    cartItem.quantity = quantity;
  } else {
    cart.items.push({ itemId, quantity });
  }

  cart.total = cart.items.reduce((total, item) => {
    const itemPrice = items.find((i) => i.id === item.itemId).price;
    return total + itemPrice * item.quantity;
  }, 0);

  res.json(cart);
});

export default router;
