// routes/food.js
// endpoint for managing foodlisting, including creating,
// updating and retrieving food items

const express = require('express');
const Food = require('../models/Food');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, quantityAvailable } = req.body;
    const food = new Food({ 
      name, 
      description,
      price,
      quantityAvailable,
     });
     // save food item to database
    await food.save();
    res.status(201).json({ message: 'Food item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food item' });
  }
});

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

module.exports = router;
