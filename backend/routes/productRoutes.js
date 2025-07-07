import express from 'express';
import { getFilteredProducts } from '../controllers/productController.js';

const router = express.Router();

// /api/products
router.get('/', getFilteredProducts);

export default router;
