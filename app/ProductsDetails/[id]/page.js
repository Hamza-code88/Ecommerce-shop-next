"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import productData from "../../components/api.json";
import { useCart } from "@/app/context/CartContext";
import Recent from "@/app/components/Recent";

const ProductDetailsPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams(); 
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const uploadedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const combinedProducts = [...productData, ...uploadedProducts];

    const selectedProduct = combinedProducts.find(
      (item) => item.id.toString() === id
    );

    setProduct(selectedProduct);

    if (selectedProduct) {
      const recentViews = JSON.parse(localStorage.getItem("recentViews")) || [];
      const updatedRecentViews = recentViews.filter(
        (item) => item.id !== selectedProduct.id
      );
      updatedRecentViews.unshift(selectedProduct);
      localStorage.setItem(
        "recentViews",
        JSON.stringify(updatedRecentViews.slice(0, 10))
      );
    }
  }, [id]);

  const handleAddToCart = (product) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!isLoggedIn) {
      router.push("/registration");
    } else {
      addToCart(product);
    }
  };

  if (!product) {
    return <p className="text-center mt-20">Loading Product...</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-20 p-4">
        <div className="flex flex-col sm:flex-row gap-6">
          
          <img
            src={product.image}
            alt={product.title}
            className="w-full sm:w-1/2 object-cover rounded-lg mb-6 sm:mb-0"
          />

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-xl text-gray-600">PKR {product.price}</p>
            <p className="mt-4 text-gray-800">{product.description}</p>
            <p className="text-gray-700">
              Category: <span className="font-medium">{product.category}</span>
            </p>

            
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-pink-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-pink-700 transition duration-200 w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <Recent />
    </>
  );
};

export default ProductDetailsPage;
