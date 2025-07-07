import React, { useEffect, useRef, useState } from 'react';
import { images } from '../assets/assets';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const scrollRef = useRef(null);

  const goldColors = {
    yellow: '#E6CA97',
    white: '#D9D9D9',
    rose: '#E1A4A9',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BackendUrl}/api/products`);
        const data = await res.json();
        const fetchedProducts = data.products || [];

        setProducts(fetchedProducts);

        // Assign default color 'yellow' to each product using a safe ID
        const defaultColors = {};
        fetchedProducts.forEach((product, index) => {
          const id = product._id ?? `${product.name}-${index}`;
          defaultColors[id] = 'yellow';
        });
        setSelectedColors(defaultColors);
      } catch (err) {
        console.error('❌ Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20 text-sm font-light">
        Loading products...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Product List
      </h1>

      {/* Arrow Buttons beside scrollable list */}
      <div className="relative w-full max-w-7xl flex items-center">
        {/* Left Arrow */}
        <button onClick={() => scroll('left')}>
         <img src={images.left_Arrow} alt="Left Arrow" className="w-10 h-20" />
               </button>

        {/* Scrollable Horizontal Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 px-10 scrollbar-hide w-full"
        >
          {products.map((product, index) => {
            const id = product._id ?? `${product.name}-${index}`;
            const selectedColor = selectedColors[id] || 'yellow';

            return (
              <div
                key={id}
                className="flex-none w-72 bg-white rounded-3xl shadow-md overflow-hidden transition hover:shadow-xl"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={product?.images?.[selectedColor]}
                    alt={product?.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h2 className="text-[15px] font-medium text-gray-900 truncate">
                    {product.name}
                  </h2>
                  <p className="text-[15px] text-gray-700 font-normal">
                    ${product.price.toFixed(2)} USD
                  </p>
                  <p className="text-[14px] font-light text-gray-500 capitalize">
                    {selectedColor} Gold
                  </p>
                  <p className="text-[12px] mt-1 text-yellow-600 font-light">
                    ⭐ {product.popularityOutOfFive} / 5
                  </p>
                </div>

                {/* Gold Color Circles */}
                <div className="flex items-center gap-2 px-4 pb-4 pt-2">
                  {Object.entries(goldColors).map(([colorName, colorHex]) => (
                    <div
                      key={colorName}
                      onClick={() =>
                        setSelectedColors((prev) => ({
                          ...prev,
                          [id]: colorName,
                        }))
                      }
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        selectedColor === colorName ? 'ring-2 ring-gray-500' : ''
                      }`}
                      style={{ backgroundColor: colorHex }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
       <button onClick={() => scroll('right')}>
        <img src={images.right_Arrow} alt="Right Arrow" className="w-10 h-20" />
      </button>

      </div>
    </div>
  );
}
