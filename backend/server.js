const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');


dotenv.config();  // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON request body
app.use('/api/auth', authRoutes);

// Connect to Database
// backend/server.js
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Database connection error:', err));


// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to GandadaGudi API');
});

// Set up static file serving for uploads (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes (you can add more routes here)
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
