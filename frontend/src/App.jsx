// import React from 'react';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "./components/ProductCard";

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products") // adjust port if different
//       .then((res) => setProducts(res.data.products || []))
//       .catch((err) => console.error("API fetch error:", err));
//   }, []);

//   return (
//     <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {products.map((product, index) => (
//         <ProductCard key={index} product={product} />
//       ))}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="p-4">
      <ProductCard />
    </div>
  );
}

export default App;
