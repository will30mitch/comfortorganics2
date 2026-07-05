'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-8 p-4 sm:p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-white text-center font-light">
          We'd love to hear from you! Reach out with any questions or feedback.
        </p>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-4 sm:p-8 border-t-4 border-green-500 mb-8">
        
        <div className="mb-6 text-center text-black text-sm sm:text-base">
          <p className="mb-2"><b>Phone:</b> (903) 524-0310</p>
          <p className="mb-2"><b>Best Time to Call:</b> Mon-Fri, 9am - 5pm</p>
          <p className="mb-2"><b>Email:</b> comfort_organics@yahoo.com</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border rounded p-2 text-black text-sm sm:text-base"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border rounded p-2 text-black text-sm sm:text-base"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="border rounded p-2 text-black text-sm sm:text-base"
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition text-sm sm:text-base text-center disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-green-700 text-center text-sm sm:text-base">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center text-sm sm:text-base">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

        </form>
      </div>
    </div>
  );
}