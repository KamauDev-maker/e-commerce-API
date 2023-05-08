import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const categories = ["women", " men", " kids"];
const items = [
  { id: uuidv4(), name: "Item 1", category: "women", price: 50 },
  { id: uuidv4(), name: "Item 2", category: "men", price: 50 },
  { id: uuidv4(), name: "Item 3", category: "kids", price: 50 },
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
router.put("/cart", (req, res) => {
    const { id, quantity } = req.body;
    const item = items.find((item) => item.id === id);

    if (!item) {
        return res.status(404).send({error: 'Not Found'});
    }

    const cartItem = cart.items.find((item) => item.id === id);

    if (cartItem) {
        cartItem.quantity = quantity;
    } else {
        cartItem.items.push({ id, quantity });
    }

    cart.total = cart.items.reduce((total, item) => {
        constitemPrice = items.find((i) => i.id === item.id).price;
        return total + itemPrice * item.quantity;
    }, 0);

    res.send(cart);
});
  
export default router;
