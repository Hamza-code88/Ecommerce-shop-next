"use client";

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const Cart = ({ closeCart }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full sm:w-11/12 md:w-9/12 lg:w-6/12 xl:w-5/12 h-[85vh] overflow-y-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">Your Cart</h2>
        <div className="space-y-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600 text-lg sm:text-xl">Your cart is empty</p>
          ) : (
            cart.map((product) => (
              <div
                key={product.id}
                className="bg-pink-50 flex flex-col sm:flex-row justify-between items-center p-4 rounded-md shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-md"
                  />
                  <div className="text-sm sm:text-base">
                    <p className="text-gray-800 font-semibold">{product.title}</p>
                    <p className="text-gray-600">PKR {product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                    className="bg-gray-200 px-3 py-2 rounded-md text-sm sm:text-base"
                  >
                    -
                  </button>
                  <p className="text-sm sm:text-base">{product.quantity}</p>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                    className="bg-gray-200 px-3 py-2 rounded-md text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-pink-700 hover:text-red-700 text-sm sm:text-base"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-semibold text-sm sm:text-base">Total Price:</p>
          <p className="font-semibold text-sm sm:text-base">PKR {getTotalPrice()}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-evenly space-y-3 sm:space-y-0">
          {cart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="border border-pink-700 text-pink-500 py-3 px-6 rounded-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Checkout
            </button>
          )}
          <button
            onClick={closeCart}
            className="bg-pink-600 text-white py-3 px-6 rounded-lg text-sm sm:text-base w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
