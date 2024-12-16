"use client";

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();

  const router = useRouter()
  useEffect(() => {
    // Agar cart empty hai, to home page par redirect karein
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart, router]);


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <ul className="space-y-2">
              {cart.map((product) => (
                <li key={product.id} className="flex justify-between">
                  <span>{product.title}</span>
                  <span>PKR {product.price} x {product.quantity || 1}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total Price:</span>
              <span>PKR {getTotalPrice()}</span>
            </div>
            <div className="mt-6">
              <button className="bg-pink-600 text-white py-2 px-4 rounded-lg">
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
