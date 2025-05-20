export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-12 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-12 p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Contact Us</h1>
        <p className="text-xl text-white text-center font-light">We'd love to hear from you! Reach out with any questions or feedback.</p>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-8 border-t-4 border-green-500 mb-8">
        <div className="mb-6 text-center text-black">
          <p className="mb-2"><b>Phone:</b> (555) 123-4567</p>
          <p className="mb-2"><b>Best Time to Call:</b> Mon-Fri, 9am - 5pm</p>
          <p className="mb-2"><b>Email:</b> support@comfortorganics.com</p>
        </div>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="border rounded p-2 text-black" required />
          <input type="email" placeholder="Your Email" className="border rounded p-2 text-black" required />
          <textarea placeholder="Your Message" className="border rounded p-2 text-black" rows={4} required />
          <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
} 