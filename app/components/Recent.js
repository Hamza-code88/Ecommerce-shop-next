import React, { useEffect, useState } from "react";
import Link from "next/link";

const RecentView = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const storedViews = JSON.parse(localStorage.getItem("recentViews")) || [];
    setRecentProducts(storedViews);
  }, []);

  return (
    <div className="recent-view-container my-10 px-4">
      <h2 className="text-center text-xl sm:text-2xl font-bold mb-5">
        Recently Viewed Products
      </h2>

      {/* Horizontal Scrollable Container */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] max-w-[200px] bg-white p-4 shadow-md rounded-lg flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <Link href={`/ProductsDetails/${product.id}`}>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-md w-full hover:bg-pink-700 transition duration-200">
                  View Details
                </button>
              </Link>
              <p className="text-gray-600 mt-2 text-center font-medium">
                $ {product.price}
              </p>
            </div>
          </div>
        ))}
        {recentProducts.length === 0 && (
          <p className="text-gray-600 text-center">
            No products viewed recently.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentView;
