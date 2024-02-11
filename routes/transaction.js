// routes/transaction.js

const express = require('express');
const Transaction = require('../models/Transaction');
const Food = require('../models/Food');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    // Retrieve food details
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    // Calculate total price
    const totalPrice = food.price * quantity;

    // Check if quantity is available
    if (quantity > food.quantityAvailable) {
      return res.status(400).json({ error: 'Insufficient quantity available' });
    }

    // Update food quantity
    food.quantityAvailable -= quantity;
    await food.save();

    // Create transaction record
    const transaction = new Transaction({ userId, foodId, quantity, totalPrice });
    await transaction.save();

    res.status(201).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Transaction failed' });
  }
});

module.exports = router;
