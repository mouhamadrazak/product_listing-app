import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function getGoldPrice() {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
         headers: {
         'x-access-token': process.env.GOLD_API_KEY,
         'Content-Type': 'application/json'
       }
    });

    const data = response.data;
    const pricePerOunce = data.price;
    const pricePerGram = pricePerOunce / 31.1035;

    return pricePerGram;
  } catch (error) {
    console.error('Failed to fetch gold price:', error.message);
    return 60;
  }
}

// Load products and calculate dynamic price
export async function getFilteredProducts(req, res) {
  const raw = fs.readFileSync('./data/products.json', 'utf-8');
  const products = JSON.parse(raw); // Parses the raw JSON string into a JavaScript array/object called products.
  const goldPrice = await getGoldPrice(); // Waits for the price before continuing.

    let mappedProducts = products.map(product => { //after we parsing the product as string or array we fitch it like this 
    const newPrice = (product.popularityScore + 1) * product.weight * goldPrice; // calculate dynamic price
    const newPopularity = Math.round(product.popularityScore * 5); // convert to scale out of 5

     return {
     ...product,         //  copy all original properties from product into the new object.
     price: newPrice,    // then overwrite ONLY the `price` property
     popularityOutOfFive: newPopularity // overwrite ONLY this property
      };
    });

  const { minPrice, maxPrice, minPopularity } = req.query;

  if (minPrice) {
    mappedProducts = mappedProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    mappedProducts = mappedProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (minPopularity) {
    mappedProducts = mappedProducts.filter(p => p.popularityOutOfFive >= parseFloat(minPopularity));
  }

  // ✅ return one object with all products inside
  
  res.json({ products: mappedProducts });
}
