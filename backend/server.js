import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

// -------APP Config ----------
const app = express();
const port = process.env.PORT || 4000; // Create the local host PORT

// --------Middlewares----------
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests

// -------API Endpoints---------

// Default route
app.get('/', (req, res) => {
  res.send("API Working"); // Confirm server is running
});

// Product API route
app.use('/api/products', productRoutes);

// -------Start Server----------
app.listen(port, () => console.log('Server started on PORT: ' + port));
