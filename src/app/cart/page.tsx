"use client";
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import { saveOrder } from '../../utils/orderHistory';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const deliveryMin = 50;
  const deliveryFeeAmount = 10;
  const isDelivery = deliveryOption === 'delivery';
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (isDelivery ? deliveryFeeAmount : 0);

  // Save order if redirected back from Square checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transactionId');
    if (transactionId && cart.length > 0) {
      saveOrder({
        id: transactionId,
        date: new Date().toISOString(),
        items: cart,
        total,
      });
      clearCart();
    }
  }, []); // Only run on mount

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/square/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, deliveryOption }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError('Failed to create checkout session.');
      }
    } catch (e) {
      setError('Failed to create checkout session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-12 p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Your Cart</h1>
        <p className="text-xl text-white text-center font-light">Review your selected products and proceed to checkout</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-8 border-t-4 border-green-500 max-w-xl w-full text-center">
        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is currently empty. Add products from the <b>Products</b> page!</p>
        ) : (
          <>
            <div className="flex justify-center gap-6 mb-4 text-black">
              <label>
                <input
                  type="radio"
                  name="deliveryOption"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={() => setDeliveryOption('pickup')}
                  className="mr-2"
                />
                Pickup
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={() => setDeliveryOption('delivery')}
                  className="mr-2"
                />
                Delivery (+$10 fee, $50 min)
              </label>
            </div>
            <ul className="mb-4 divide-y">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <div className="text-left">
                    <div className="font-semibold text-black">
                      {item.name}
                      {item.variationName && (
                        <span className="text-gray-500"> — {item.variationName}</span>
                      )}
                    </div>
                    <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-700 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="font-bold text-xl mb-2" style={{ color: 'black' }}>Subtotal: ${subtotal.toFixed(2)}</div>
            {isDelivery && (
              <div className="mb-2 text-black">Delivery Fee: <span className="font-bold">${deliveryFeeAmount.toFixed(2)}</span></div>
            )}
            <div className="font-bold text-xl mb-4" style={{ color: 'black' }}>Total: ${total.toFixed(2)}</div>
            {isDelivery && subtotal < deliveryMin && (
              <div className="text-red-600 font-semibold mb-2">
                Minimum order amount for delivery is ${deliveryMin}. Please add more items to your cart to proceed to checkout.
              </div>
            )}
            <button
              className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition mb-2 disabled:opacity-50"
              onClick={handleCheckout}
              disabled={cart.length === 0 || loading || (isDelivery && subtotal < deliveryMin)}
            >
              {loading ? 'Redirecting...' : 'Checkout'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <br />
            <button
              className="text-gray-500 hover:underline text-sm"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
} 