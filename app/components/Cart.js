"use client";

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = ({ closeCart }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
const router = useRouter()

const handleCheckout = () => {
  closeCart();
  router.push("/checkout")
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-6/12 h-[600px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((product) => (
              <div
                key={product.id}
                className="bg-pink-50 flex justify-between items-center p-4 rounded-md"
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                  <p>{product.title}</p>
                  <p>PKR {product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-pink-700 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-semibold">Total Price:</p>
          <p className="font-semibold">PKR {getTotalPrice()}</p>
        </div>
        <div className="mt-4 flex justify-evenly">
        
  {cart.length > 0 && ( 
          <div className="">
            <button
              onClick={handleCheckout} 
              className="border border-pink-700 text-pink-500 py-2 px-4 rounded-lg"> Checkout </button>
          </div>
        )}
  
  <button onClick={closeCart} className="bg-pink-600 text-white py-2 px-4 rounded-lg" > Close </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
