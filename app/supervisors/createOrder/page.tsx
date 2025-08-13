"use client";
import { useState } from "react";

export default function CreateOrderPage() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const submitOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ item, quantity }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Order created successfully!");
      setItem("");
      setQuantity(1);
    } else {
      setMessage("Failed to create order.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Create Order</h1>
      <input
        type="text"
        placeholder="Item Name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="border p-2 w-full mb-4"
      />
      <button onClick={submitOrder} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      <p className="mt-4 text-green-600">{message}</p>
    </div>
  );
}
