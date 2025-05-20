"use client";
import { useEffect, useState } from 'react';
import { getOrders, Order } from '../../utils/orderHistory';

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl shadow-lg mb-12 p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Your Profile</h1>
        <p className="text-xl text-white text-center font-light">View your order history and account details</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-8 border-t-4 border-yellow-500 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-700">No orders yet. Make a purchase to see your order history!</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li key={order.id} className="border rounded p-4 text-left bg-yellow-50">
                <div className="font-semibold mb-1">Order Date: {new Date(order.date).toLocaleString()}</div>
                <ul className="mb-2 list-disc pl-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="font-bold">Total: ${order.total.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 