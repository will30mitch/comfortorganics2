"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    variationName?: string;
  }>;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Get customer ID from Square's customer token
        const customerToken = localStorage.getItem('square_customer_token');
        if (!customerToken) {
          router.push('/login');
          return;
        }

        // Decode customer ID from token
        let customerId = '';
        try {
          customerId = atob(customerToken);
        } catch (e) {
          router.push('/login');
          return;
        }
        if (!customerId) {
          router.push('/login');
          return;
        }

        // Fetch customer data
        const customerResponse = await fetch(`/api/square/customer?customerId=${customerId}`);
        const customerData = await customerResponse.json();
        
        if (customerData.customer) {
          setCustomer(customerData.customer);
          
          // Fetch orders
          const ordersResponse = await fetch(`/api/square/orders?customerId=${customerId}`);
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('account')}
              className={`${
                activeTab === 'account'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Order History
            </button>
          </nav>
        </div>

        {/* Account Details Tab */}
        {activeTab === 'account' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{customer.givenName} {customer.familyName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{customer.emailAddress}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{customer.phoneNumber}</p>
              </div>
              <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => {/* Add edit profile handler */}}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-xl font-semibold">Order History</h2>
            </div>
            <div className="border-t border-gray-200">
              {orders.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No orders found</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <li key={order.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">{order.status}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ul className="text-sm text-gray-500">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity}x {item.name} 
                              {item.variationName && ` (${item.variationName})`} - 
                              ${(item.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 