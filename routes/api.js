import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const categories = ['women', ' men', ' kids'];
const items = [
    { id: uuidv4() , name: 'Item 1', category: 'women', price: 50 },
    { id: uuidv4() , name: 'Item 2', category: 'men', price: 50 },
    { id: uuidv4(), name: 'Item 3', category: 'kids', price: 50},
];

let cart ={
    items: [],
    total: 0,
};

router.get('/categories', (req, res) => {
    res.send(categories);
});

router.get('/items', (req, res) => {
    res.send(items);
});

export default router;