// Main app
const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const transactionRoutes = require('./routes/transaction');


// Define the PORT
const PORT = process.env.PORT || 8080


//  Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/foods', foodRoutes);
app.use('/transactions', transactionRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Farmily API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
