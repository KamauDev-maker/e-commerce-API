import express from "express";
import { v4 as uuidv4 } from "uuid";
import { allCategories, allItems, newItem, itemByCategory, getCart, updateCart} from "../controllers/api.js";

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

router.get("/categories", allCategories);

router.get("/items", allItems);

router.post("/items", newItem);

router.get("/items-by-category/:category", itemByCategory);

router.get("/cart", getCart);

router.post('/cart', updateCart);

export default router;
