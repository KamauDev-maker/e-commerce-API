import { v4 as uuidv4 } from "uuid";

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

export const allCategories = (req, res) => {
    res.send(categories);
}

export const allItems = (req, res) => {
    res.send(items);
}

export const newItem =  (req, res) => {
    const item = req.body;
    const itemId = uuidv4();
    const itemWithId = { ...item, id: itemId };
    items.push(itemWithId);
    res.send(`${item.name} added successfully`);
}

export const itemByCategory = (req, res) => {
    const category = req.params.category;
    const filteredItems = items.filter((item) => item.category === category);
    res.send(filteredItems);
}

export const getCart = (req, res) => {
    res.send(cart);
}

export const updateCart = (req, res) => {
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
}
  